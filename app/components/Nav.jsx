import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between border-b border-border py-7">
      <div className="flex items-baseline gap-2.5 font-serif text-[21px] font-semibold">
        Ledgerly
        <span className="rounded-[3px] border border-border px-1.5 py-0.5 font-mono text-[10.5px] tracking-[0.08em] text-ink-soft">
          No. 001
        </span>
      </div>

      <div className="flex items-center gap-8 text-[14.5px] font-medium">
        <Link
          href="#features"
          className="hidden text-ink-soft hover:text-ink sm:inline"
        >
          Product
        </Link>
        <Link
          href="#how"
          className="hidden text-ink-soft hover:text-ink sm:inline"
        >
          How it works
        </Link>
        <Link
          href="#pricing"
          className="hidden text-ink-soft hover:text-ink sm:inline"
        >
          Pricing
        </Link>
        <Link
          href="#"
          className="hidden text-ink-soft hover:text-ink sm:inline"
        >
          Log in
        </Link>
        <Link
          href="#start"
          className="inline-flex items-center gap-2 rounded border border-transparent bg-ink px-5 py-[11px] text-[14.5px] font-semibold text-paper hover:bg-[#0f1811] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-margin"
        >
          Open a ledger
        </Link>
      </div>
    </nav>
  );
}
