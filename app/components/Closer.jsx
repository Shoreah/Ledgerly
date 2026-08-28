export default function Closer() {
  return (
    <section id="pricing" className="border-b border-border py-16">
      <div className="flex flex-wrap items-center justify-between gap-6 max-[720px]:flex-col max-[720px]:items-start">
        <div>
          <h2 className="mb-2 font-serif text-[28px] font-medium text-ink">
            Balance your books. Start today.
          </h2>
          <p className="m-0 text-ink-soft">
            Free for your first three invoices. No card, no setup call.
          </p>
        </div>

        <a
          href="/dashboard"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded border border-transparent bg-stamp px-5 py-[11px] text-[14.5px] font-semibold text-[#FCF3EE] hover:bg-[#8f3427] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-margin"
        >
          Open a ledger, it&apos;s free
        </a>
      </div>
    </section>
  );
}
