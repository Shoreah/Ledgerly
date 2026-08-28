"use client";

import StatusBadge from "../components/dashboard/StatusBadge";
import NewInvoiceButton from "../components/dashboard/NewInvoiceButton";
import {
  useDashboardData,
  formatMoney,
  describeInvoice,
} from "../components/dashboard/DashboardDataContext";

function StatCard({ label, value, valueClass = "", sub }) {
  return (
    <div className="rounded-[7px] border border-border bg-paper px-5 py-[18px]">
      <div className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-soft">
        {label}
      </div>
      <div className={`font-mono text-2xl font-bold ${valueClass}`}>
        {value}
      </div>
      <div className="mt-1.5 text-[12.5px] text-ink-faint">{sub}</div>
    </div>
  );
}

export default function OverviewPage() {
  const { invoices, stats, openModal } = useDashboardData();
  const recentActivity = invoices.slice(0, 4);

  return (
    <>
      <div className="mb-[30px] flex flex-wrap items-start justify-between gap-5">
        <div>
          <span className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.12em] text-margin">
            Ledger entry — this month
          </span>
          <h1 className="mt-1.5 font-serif text-[27px] font-medium text-ink">
            Overview
          </h1>
        </div>
        <NewInvoiceButton />
      </div>

      <div className="mb-[34px] grid grid-cols-4 gap-3.5 max-[780px]:grid-cols-2">
        <StatCard
          label="Outstanding"
          value={formatMoney(stats.outstandingUSD, "USD")}
          sub={`Across ${stats.outstandingCount} invoice${
            stats.outstandingCount === 1 ? "" : "s"
          }`}
        />
        <StatCard
          label="Paid this month"
          valueClass="text-ok"
          value={formatMoney(stats.paidUSD, "USD")}
          sub={`${stats.paidCount} invoices settled`}
        />
        <StatCard
          label="Overdue"
          valueClass="text-stamp"
          value={formatMoney(stats.overdueUSD, "USD")}
          sub={
            stats.overdueCount
              ? `${stats.overdueCount} invoice, past due`
              : "Nothing overdue"
          }
        />
        <StatCard
          label="Drafts"
          value={String(stats.drafts)}
          sub="Not yet sent"
        />
      </div>

      <div className="mb-[30px] overflow-hidden rounded-lg border border-border bg-paper">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <h2 className="text-[17px] font-medium text-ink">Recent activity</h2>
          <a
            href="/dashboard/invoices"
            className="font-mono text-[12.5px] text-ink-soft hover:text-ink hover:underline"
          >
            View all invoices
          </a>
        </div>

        {recentActivity.length === 0 ? (
          <div className="px-5 py-14 text-center text-[14.5px] text-ink-soft">
            No invoices yet.{" "}
            <button
              onClick={openModal}
              className="font-semibold text-margin hover:underline"
            >
              Create your first one
            </button>{" "}
            to see it here.
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {[
                  "No.",
                  "Client",
                  "Description",
                  "Amount",
                  "Status",
                  "Due",
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
              {recentActivity.map((row) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
