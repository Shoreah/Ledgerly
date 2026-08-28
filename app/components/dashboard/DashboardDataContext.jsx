"use client";

import { createContext, useContext, useMemo, useState } from "react";

const DashboardDataContext = createContext(null);

export const CURRENCIES = {
  USD: { symbol: "$", label: "US Dollar (USD)" },
  NGN: { symbol: "₦", label: "Nigerian Naira (NGN)" },
};

// Static rate used only to roll mixed-currency invoices into one reporting
// number for the Overview stat cards. Swap for a live rate once this is
// wired up to a currency API.
const NGN_PER_USD = 1500;

function toUSD(amount, currency) {
  return currency === "NGN" ? amount / NGN_PER_USD : amount;
}

export function formatMoney(amount, currency) {
  const symbol = CURRENCIES[currency]?.symbol ?? "$";
  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function describeInvoice(invoice) {
  if (invoice.lineItems.length === 1) return invoice.lineItems[0].description;
  return `${invoice.lineItems[0].description} +${
    invoice.lineItems.length - 1
  } more`;
}

export function DashboardDataProvider({ children }) {
  const [invoices, setInvoices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function addInvoice({ client, currency, lineItems, status }) {
    const total = lineItems.reduce(
      (sum, item) => sum + (parseFloat(item.amount) || 0),
      0,
    );

    setInvoices((prev) => {
      const no = String(prev.length + 1).padStart(3, "0");
      const invoice = {
        id: crypto.randomUUID(),
        no,
        client,
        currency,
        lineItems,
        total,
        status,
        date:
          status === "sent"
            ? new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "Not sent",
      };
      return [invoice, ...prev];
    });
  }

  const clients = useMemo(() => {
    const map = new Map();
    for (const invoice of invoices) {
      const entry = map.get(invoice.client) || {
        name: invoice.client,
        invoiceCount: 0,
        balanceUSD: 0,
      };
      entry.invoiceCount += 1;
      if (invoice.status !== "paid") {
        entry.balanceUSD += toUSD(invoice.total, invoice.currency);
      }
      map.set(invoice.client, entry);
    }
    return Array.from(map.values());
  }, [invoices]);

  const stats = useMemo(() => {
    const sentInvoices = invoices.filter((i) => i.status === "sent");
    const draftCount = invoices.filter((i) => i.status === "draft").length;
    return {
      outstandingUSD: sentInvoices.reduce(
        (sum, i) => sum + toUSD(i.total, i.currency),
        0,
      ),
      outstandingCount: sentInvoices.length,
      // Paid and overdue aren't reachable yet without payment processing or
      // due-date tracking, both land in a later phase.
      paidUSD: 0,
      paidCount: 0,
      overdueUSD: 0,
      overdueCount: 0,
      drafts: draftCount,
    };
  }, [invoices]);

  const value = {
    invoices,
    clients,
    stats,
    addInvoice,
    isModalOpen,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false),
  };

  return (
    <DashboardDataContext.Provider value={value}>
      {children}
    </DashboardDataContext.Provider>
  );
}

export function useDashboardData() {
  const context = useContext(DashboardDataContext);
  if (!context) {
    throw new Error(
      "useDashboardData must be used within a DashboardDataProvider",
    );
  }
  return context;
}
