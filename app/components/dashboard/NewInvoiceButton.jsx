"use client";

import { useDashboardData } from "./DashboardDataContext";

export default function NewInvoiceButton({ variant = "primary" }) {
  const { openModal } = useDashboardData();

  const classes =
    variant === "primary"
      ? "border-transparent bg-ink text-paper hover:bg-[#0f1811]"
      : "border-border text-ink hover:border-ink";

  return (
    <button
      onClick={openModal}
      className={`inline-flex items-center gap-2 rounded border px-[18px] py-2.5 text-sm font-semibold ${classes}`}
    >
      + New invoice
    </button>
  );
}
