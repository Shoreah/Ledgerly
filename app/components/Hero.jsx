import LedgerCard from "./LedgerCard";

export default function Hero() {
  return (
    <section className="grid items-center gap-14 border-b border-border pt-[72px] pb-[88px] md:grid-cols-[1.05fr_0.95fr] max-[900px]:grid-cols-1 max-[900px]:pt-12 max-[900px]:pb-16">
      <div>
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-margin">
          Ledger entry — freelance invoicing
        </span>

        <h1 className="mb-[22px] mt-[18px] font-serif text-[clamp(34px,4.6vw,56px)] font-medium leading-[1.06] tracking-[-0.01em] text-ink">
          Every invoice,
          <br />
          <em className="italic text-stamp">tallied</em> and settled.
        </h1>

        <p className="mb-[30px] max-w-[46ch] text-[17.5px] text-ink-soft">
          Ledgerly is invoicing built the way a ledger works: enter the line,
          watch the total add up, stamp it paid. No spreadsheets, no chasing
          wire transfers, no software that feels bigger than the job.
        </p>

        <div className="mb-[26px] flex flex-wrap gap-3.5">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded border border-transparent bg-stamp px-5 py-[11px] text-[14.5px] font-semibold text-[#FCF3EE] hover:bg-[#8f3427] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-margin"
          >
            Start your first ledger
          </a>
          <a
            href="#how"
            className="inline-flex items-center gap-2 rounded border border-border px-5 py-[11px] text-[14.5px] font-semibold text-ink hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-margin"
          >
            See how it adds up
          </a>
        </div>

        <div className="font-mono text-[12.5px] text-ink-soft">
          No card required. First three invoices, free.
        </div>
      </div>

      <LedgerCard />
    </section>
  );
}
