export default function Problem() {
  const rows = [
    {
      no: "No. 01",
      issue: "Chasing clients for payment",
      balance: "Balance: hours lost every month",
    },
    {
      no: "No. 02",
      issue: "Guessing what you earned by quarter",
      balance: "Balance: a scramble at tax time",
    },
    {
      no: "No. 03",
      issue: "Sending invoices from a generic template",
      balance: "Balance: looks like everyone else's",
    },
  ];

  return (
    <section id="problem" className="border-b border-border py-16">
      <div className="mb-10 max-w-[62ch]">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-margin">
          The old way
        </span>
        <h2 className="mt-3.5 font-serif text-[clamp(26px,3vw,34px)] font-medium text-ink">
          Freelancing math shouldn&apos;t feel like homework.
        </h2>
      </div>

      <div className="flex flex-col">
        {rows.map((row, i) => (
          <div
            key={row.no}
            className={`grid grid-cols-[90px_1fr_1fr] items-center gap-[18px] border-t border-border py-5 max-[720px]:grid-cols-1 max-[720px]:gap-1 ${
              i === rows.length - 1 ? "border-b" : ""
            }`}
          >
            <span className="font-mono text-[12.5px] text-margin">
              {row.no}
            </span>
            <span className="text-[16.5px] font-medium text-ink">
              {row.issue}
            </span>
            <span className="text-right font-mono text-[13.5px] text-ink-soft max-[720px]:text-left">
              {row.balance}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
