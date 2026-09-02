"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const DashboardDataContext = createContext(null);

export const CURRENCIES = {
  USD: { symbol: "$", label: "US Dollar (USD)" },
  NGN: { symbol: "₦", label: "Nigerian Naira (NGN)" },
};

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

function mapInvoiceRow(row, index) {
  const lineItems = (row.invoice_line_items || []).map((line) => ({
    id: line.id,
    description: line.description,
    amount: Number(line.quantity) * Number(line.unit_price),
  }));

  const total = lineItems.reduce((sum, item) => sum + item.amount, 0);

  return {
    id: row.id,
    no: String(index + 1).padStart(3, "0"),
    client: row.clients?.name ?? "Unknown client",
    clientId: row.client_id,
    currency: row.currency,
    lineItems,
    total,
    status: row.status,
    date:
      row.status === "sent"
        ? new Date(row.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : "Not sent",
  };
}

export function DashboardDataProvider({ children }) {
  const [invoices, setInvoices] = useState([]);
  const [realClients, setRealClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function loadData() {
    setIsLoading(true);
    setLoadError(null);

    const supabase = createClient();

    const [invoicesResult, clientsResult] = await Promise.all([
      supabase
        .from("invoices")
        .select(
          "*, clients(name), invoice_line_items(id, description, quantity, unit_price)",
        )
        .order("created_at", { ascending: true }),
      supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: true }),
    ]);

    if (invoicesResult.error || clientsResult.error) {
      setLoadError(
        invoicesResult.error?.message || clientsResult.error?.message,
      );
      setIsLoading(false);
      return;
    }

    setInvoices(invoicesResult.data.map(mapInvoiceRow));
    setRealClients(clientsResult.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addInvoice({
    clientId,
    newClientName,
    currency,
    lineItems,
    status,
  }) {
    setSaveError(null);
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaveError("You must be logged in to create an invoice.");
      return;
    }

    let finalClientId = clientId;

    if (!finalClientId && newClientName) {
      const { data: newClient, error: clientError } = await supabase
        .from("clients")
        .insert({ user_id: user.id, name: newClientName })
        .select()
        .single();

      if (clientError) {
        setSaveError(clientError.message);
        return;
      }

      finalClientId = newClient.id;
    }

    const { data: newInvoice, error: invoiceError } = await supabase
      .from("invoices")
      .insert({
        user_id: user.id,
        client_id: finalClientId,
        currency,
        status,
      })
      .select()
      .single();

    if (invoiceError) {
      setSaveError(invoiceError.message);
      return;
    }

    const lineItemRows = lineItems.map((item) => ({
      invoice_id: newInvoice.id,
      description: item.description,
      quantity: 1,
      unit_price: parseFloat(item.amount) || 0,
    }));

    const { error: lineItemsError } = await supabase
      .from("invoice_line_items")
      .insert(lineItemRows);

    if (lineItemsError) {
      setSaveError(lineItemsError.message);
      return;
    }

    await loadData();
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
    realClients,
    isLoading,
    loadError,
    saveError,
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
