const styles = {
  paid: "text-ok border-ok bg-ok/[0.08]",
  sent: "text-gold border-gold bg-gold/[0.08]",
  overdue: "text-stamp border-stamp bg-stamp/[0.08]",
  draft: "text-ink-faint border-border border-dashed bg-transparent",
};

const labels = {
  paid: "Paid",
  sent: "Sent",
  overdue: "Overdue",
  draft: "Draft",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block rounded border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.05em] ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
