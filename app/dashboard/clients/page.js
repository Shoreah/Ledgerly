"use client";

import { useState } from "react";
import ConfirmDialog from "../../components/dashboard/ConfirmDialog";
import {
  useDashboardData,
  formatMoney,
} from "../../components/dashboard/DashboardDataContext";

export default function ClientsPage() {
  const { clients, isLoading, loadError, deleteClient } = useDashboardData();
  const [pendingDelete, setPendingDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function requestDelete(client) {
    setPendingDelete(client);
  }

  function cancelDelete() {
    setPendingDelete(null);
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setIsDeleting(true);
    await deleteClient(pendingDelete.id);
    setIsDeleting(false);
    setPendingDelete(null);
  }

  const warningMessage = pendingDelete
    ? pendingDelete.invoiceCount > 0
      ? `Delete ${pendingDelete.name} and all ${pendingDelete.invoiceCount} of their invoice${
          pendingDelete.invoiceCount === 1 ? "" : "s"
        }? This can't be undone.`
      : `Delete ${pendingDelete.name}? This can't be undone.`
    : "";

  return (
    <>
      <div className="mb-[30px] flex flex-wrap items-start justify-between gap-5">
        <div>
          <span className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.12em] text-margin">
            Ledger entry — accounts
          </span>
          <h1 className="mt-1.5 font-serif text-[27px] font-medium text-ink">
            Clients
          </h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded border border-border px-[18px] py-2.5 text-sm font-semibold text-ink hover:border-ink">
          + Add client
        </button>
      </div>

      {isLoading ? (
        <div className="rounded-lg border border-dashed border-border bg-paper px-5 py-14 text-center text-[14.5px] text-ink-soft">
          Loading your clients...
        </div>
      ) : loadError ? (
        <div className="rounded-lg border border-dashed border-border bg-paper px-5 py-14 text-center text-[14.5px] text-stamp">
          Couldn't load your clients. {loadError}
        </div>
      ) : clients.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-paper px-5 py-14 text-center text-[14.5px] text-ink-soft">
          No clients yet. They&apos;ll show up here once you create an invoice
          for them.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3.5 max-[900px]:grid-cols-2 max-[620px]:grid-cols-1">
          {clients.map((client) => (
            <div
              key={client.id}
              className="rounded-[7px] border border-border bg-paper px-5 py-[18px]"
            >
              <div className="mb-1 flex items-start justify-between gap-2">
                <div className="text-[15.5px] font-semibold text-ink">
                  {client.name}
                </div>
                <button
                  onClick={() => requestDelete(client)}
                  aria-label={`Delete ${client.name}`}
                  className="font-mono text-[11.5px] text-ink-faint hover:text-stamp"
                >
                  Delete
                </button>
              </div>
              <div className="mb-3.5 text-[12.5px] text-ink-soft">
                {client.invoiceCount} invoice
                {client.invoiceCount === 1 ? "" : "s"}
              </div>
              <div className="flex items-baseline justify-between border-t border-dashed border-border pt-3">
                <span className="font-mono text-[11px] uppercase text-ink-faint">
                  Balance
                </span>
                <span
                  className={`font-mono text-base font-bold ${
                    client.balanceUSD > 0 ? "text-stamp" : "text-ok"
                  }`}
                >
                  {formatMoney(client.balanceUSD, "USD")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={pendingDelete !== null}
        title="Delete client"
        message={warningMessage}
        confirmLabel="Delete client"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        isLoading={isDeleting}
      />
    </>
  );
}
