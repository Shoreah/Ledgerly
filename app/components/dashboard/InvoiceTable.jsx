"use client";

import { useState } from "react";
import StatusBadge from "./StatusBadge";
import {
  useDashboardData,
  formatMoney,
  describeInvoice,
} from "./DashboardDataContext";

const filters = ["all", "paid", "sent", "overdue", "draft"];

function actionLabel(status) {
  if (status === "overdue") return "Remind";
  if (status === "draft") return "Edit";
  return "View";
}

export default function InvoiceTable() {
  const { invoices, isLoading, loadError } = useDashboardData();
  const [filter, setFilter] = useState("all");

  const visible =
    filter === "all"
      ? invoices
      : invoices.filter((invoice) => invoice.status === filter);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-paper">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <h2 className="text-[17px] font-medium text-ink">All invoices</h2>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1.5 font-mono text-xs capitalize ${
                filter === f
                  ? "border-ink bg-ink text-paper"
                  : "border-border text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="px-5 py-14 text-center text-[14.5px] text-ink-soft">
          Loading your invoices...
        </div>
      ) : loadError ? (
        <div className="px-5 py-14 text-center text-[14.5px] text-stamp">
          Couldn't load your invoices. {loadError}
        </div>
      ) : invoices.length === 0 ? (
        <div className="px-5 py-14 text-center text-[14.5px] text-ink-soft">
          No invoices yet. Create one from the button above.
        </div>
      ) : visible.length === 0 ? (
        <div className="px-5 py-14 text-center text-[14.5px] text-ink-soft">
          No invoices match this filter.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr>
                {[
                  "No.",
                  "Client",
                  "Description",
                  "Amount",
                  "Status",
                  "Due",
                  "",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-border px-5 py-3 text-left font-mono text-[11px] uppercase tracking-[0.06em] text-ink-faint"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-dashed divide-border">
              {visible.map((row) => (
                <tr key={row.id} className="hover:bg-ink/[0.03]">
                  <td className="px-5 py-3.5 font-mono text-[13px] text-ink-soft">
                    {row.no}
                  </td>
                  <td className="px-5 py-3.5 text-[14.5px] font-medium text-ink">
                    {row.client}
                  </td>
                  <td className="px-5 py-3.5 text-[14.5px] text-ink">
                    {describeInvoice(row)}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[14.5px] font-semibold text-ink">
                    {formatMoney(row.total, row.currency)}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-5 py-3.5 text-[13.5px] text-ink-soft">
                    {row.date}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button className="font-mono text-[12.5px] text-ink-soft hover:text-ink hover:underline">
                      {actionLabel(row.status)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
