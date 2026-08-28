export default function HowItWorks() {
  const steps = [
    {
      no: "No. 01",
      title: "Add the work",
      body: "List what you did and what it costs. Ledgerly formats it as you type.",
    },
    {
      no: "No. 02",
      title: "Send the ledger",
      body: "Your client gets a clean invoice by email, with a link to pay directly.",
    },
    {
      no: "No. 03",
      title: "Get stamped paid",
      body: "Once they pay, the invoice closes itself and your total updates on its own.",
    },
  ];

  return (
    <section id="how" className="border-b border-border py-16">
      <div className="mb-10 max-w-[62ch]">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-margin">
          How it works
        </span>
        <h2 className="mt-3.5 font-serif text-[clamp(26px,3vw,34px)] font-medium text-ink">
          Three entries, start to finish.
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-7 max-[780px]:grid-cols-1">
        {steps.map((step) => (
          <div key={step.no}>
            <span className="mb-2.5 block font-mono text-[12.5px] text-margin">
              {step.no}
            </span>
            <h3 className="mb-2 text-[19px] font-medium text-ink">
              {step.title}
            </h3>
            <p className="m-0 text-[14.5px] text-ink-soft">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
