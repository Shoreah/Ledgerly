"use client";

import { useState } from "react";
import {
  CURRENCIES,
  formatMoney,
  useDashboardData,
} from "./DashboardDataContext";

function emptyLine() {
  return { id: crypto.randomUUID(), description: "", amount: "" };
}

const NEW_CLIENT_VALUE = "__new__";

export default function NewInvoiceModal() {
  const { isModalOpen, closeModal, addInvoice, realClients, saveError } =
    useDashboardData();
  const [clientId, setClientId] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [lineItems, setLineItems] = useState([emptyLine()]);

  if (!isModalOpen) return null;

  const total = lineItems.reduce(
    (sum, item) => sum + (parseFloat(item.amount) || 0),
    0,
  );

  const isAddingNewClient = clientId === NEW_CLIENT_VALUE;

  function updateLine(id, field, value) {
    setLineItems((prev) =>
      prev.map((line) => (line.id === id ? { ...line, [field]: value } : line)),
    );
  }

  function removeLine(id) {
    setLineItems((prev) => prev.filter((line) => line.id !== id));
  }

  function addLine() {
    setLineItems((prev) => [...prev, emptyLine()]);
  }

  function resetAndClose() {
    setClientId("");
    setNewClientName("");
    setCurrency("USD");
    setLineItems([emptyLine()]);
    closeModal();
  }

  async function handleSave(status) {
    const validLines = lineItems.filter(
      (line) => line.description.trim() && parseFloat(line.amount) > 0,
    );

    const hasClient = isAddingNewClient
      ? newClientName.trim().length > 0
      : clientId.length > 0;

    if (!hasClient || validLines.length === 0) return;

    await addInvoice({
      clientId: isAddingNewClient ? null : clientId,
      newClientName: isAddingNewClient ? newClientName.trim() : null,
      currency,
      lineItems: validLines,
      status,
    });
    resetAndClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/35 px-5 py-11"
      onClick={(e) => {
        if (e.target === e.currentTarget) resetAndClose();
      }}
    >
      <div className="w-full max-w-[560px] rounded-[10px] bg-paper shadow-[0_30px_60px_-20px_rgba(28,42,34,0.45)]">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-serif text-[19px] font-medium text-ink">
            New invoice
          </h2>
          <button
            onClick={resetAndClose}
            aria-label="Close"
            className="p-1 text-xl leading-none text-ink-soft hover:text-ink"
          >
            &times;
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="mb-4">
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.05em] text-ink-soft">
              Client
            </label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full rounded-[5px] border border-border bg-white px-[11px] py-[9px] text-[14.5px] text-ink focus:border-margin focus:outline-none"
            >
              <option value="" disabled>
                Select a client
              </option>
              {realClients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
              <option value={NEW_CLIENT_VALUE}>+ Add new client</option>
            </select>

            {isAddingNewClient && (
              <input
                type="text"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                placeholder="New client name"
                className="mt-2 w-full rounded-[5px] border border-border bg-white px-[11px] py-[9px] text-[14.5px] text-ink focus:border-margin focus:outline-none"
                autoFocus
              />
            )}
          </div>

          <div className="mb-4">
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.05em] text-ink-soft">
              Currency
            </label>
            <div className="flex gap-2">
              {Object.entries(CURRENCIES).map(([code, info]) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setCurrency(code)}
                  className={`flex-1 rounded-[5px] border px-3 py-2 text-[13.5px] font-medium ${
                    currency === code
                      ? "border-ink bg-ink text-paper"
                      : "border-border text-ink-soft hover:border-ink hover:text-ink"
                  }`}
                >
                  {info.symbol} {info.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-1.5 mt-[18px]">
            <div className="grid grid-cols-[1fr_110px_30px] gap-2.5 border-b border-border pb-2 font-mono text-[11px] uppercase text-ink-faint">
              <span>Description</span>
              <span className="text-right">Amount</span>
              <span></span>
            </div>
            {lineItems.map((line) => (
              <div
                key={line.id}
                className="grid grid-cols-[1fr_110px_30px] items-center gap-2.5 border-b border-dashed border-border py-2.5"
              >
                <input
                  type="text"
                  value={line.description}
                  onChange={(e) =>
                    updateLine(line.id, "description", e.target.value)
                  }
                  placeholder="What did you do"
                  className="rounded border border-border px-2.5 py-[7px] text-sm text-ink"
                />
                <input
                  type="number"
                  step="0.01"
                  value={line.amount}
                  onChange={(e) =>
                    updateLine(line.id, "amount", e.target.value)
                  }
                  placeholder="0.00"
                  className="rounded border border-border px-2.5 py-[7px] text-right font-mono text-sm text-ink"
                />
                <button
                  onClick={() => removeLine(line.id)}
                  aria-label="Remove line"
                  className="p-0.5 text-base text-ink-faint hover:text-stamp"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addLine}
            className="pt-2.5 font-mono text-[13px] font-semibold text-margin hover:underline"
          >
            + Add a line
          </button>

          <div className="mt-4 flex items-baseline justify-between border-t-[3px] border-double border-ink pt-3.5">
            <span className="font-mono text-xs uppercase tracking-[0.05em] text-ink-soft">
              Total due
            </span>
            <span className="font-mono text-xl font-bold text-ink">
              {formatMoney(total, currency)}
            </span>
          </div>

          {saveError && (
            <p className="mt-3 text-[13.5px] text-stamp">{saveError}</p>
          )}
        </div>

        <div className="flex justify-end gap-2.5 border-t border-border px-6 py-[18px]">
          <button
            onClick={() => handleSave("draft")}
            className="inline-flex items-center gap-2 rounded border border-border px-5 py-[11px] text-[14.5px] font-semibold text-ink hover:border-ink"
          >
            Save as draft
          </button>
          <button
            onClick={() => handleSave("sent")}
            className="inline-flex items-center gap-2 rounded border border-transparent bg-ink px-5 py-[11px] text-[14.5px] font-semibold text-paper hover:bg-[#0f1811]"
          >
            Send invoice
          </button>
        </div>
      </div>
    </div>
  );
}
