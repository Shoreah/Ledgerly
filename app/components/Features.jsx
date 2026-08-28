export default function Features() {
  const features = [
    {
      metric: "Avg. time: 47 sec",
      title: "Invoices in under a minute",
      body: "Pick a client, add the lines, send. The layout is already client ready.",
    },
    {
      metric: "Days saved: 3 / month",
      title: "Reminders that chase for you",
      body: "Ledgerly follows up on overdue invoices on a schedule you set, in your voice.",
    },
    {
      metric: "One click, one PDF",
      title: "Receipts your clients can file",
      body: "Every paid invoice becomes a clean receipt, ready to hand to their bookkeeper.",
    },
    {
      metric: "Updated in real time",
      title: "One running total, every client",
      body: "See what's owed, what's overdue, and what's cleared without opening a spreadsheet.",
    },
  ];

  return (
    <section id="features" className="border-b border-border py-16">
      <div className="mb-10 max-w-[62ch]">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-margin">
          What&apos;s in the ledger
        </span>
        <h2 className="mt-3.5 font-serif text-[clamp(26px,3vw,34px)] font-medium text-ink">
          Everything an invoice needs, nothing it doesn&apos;t.
        </h2>
        <p className="mt-3 text-base text-ink-soft">
          Four parts of Ledgerly do most of the work. The rest stays out of
          your way.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border max-[720px]:grid-cols-1">
        {features.map((feature) => (
          <div key={feature.title} className="bg-paper px-[26px] py-7">
            <div className="mb-3 font-mono text-[13px] text-gold">
              {feature.metric}
            </div>
            <h3 className="mb-2 text-[19px] font-medium text-ink">
              {feature.title}
            </h3>
            <p className="m-0 text-[14.5px] text-ink-soft">{feature.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
