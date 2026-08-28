"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "##" },
  { href: "/dashboard/invoices", label: "Invoices", icon: "$" },
  { href: "/dashboard/clients", label: "Clients", icon: "@" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-[232px] flex-shrink-0 flex-col border-r border-border bg-paper px-[18px] py-[26px] max-[860px]:hidden">
      <div className="mb-[30px] flex items-baseline gap-2 px-2 font-serif text-[19px] font-semibold">
        Ledgerly
        <span className="rounded-[3px] border border-border px-1.5 py-0.5 font-mono text-[10px] text-ink-soft">
          No. 001
        </span>
      </div>

      <div className="mb-2 px-2.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint">
        Ledger
      </div>

      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`mb-0.5 flex items-center gap-[11px] rounded-[5px] border-l-2 px-2.5 py-2.5 text-[14.5px] font-medium ${
              active
                ? "border-margin bg-margin/[0.08] text-ink"
                : "border-transparent text-ink-soft hover:bg-ink/5 hover:text-ink"
            }`}
          >
            <span
              className={`w-4 text-center font-mono text-[13px] ${
                active ? "text-margin" : "text-ink-faint"
              }`}
            >
              {item.icon}
            </span>
            {item.label}
          </Link>
        );
      })}

      <div className="mb-2 mt-[18px] px-2.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint">
        Account
      </div>

      <Link
        href="/dashboard/settings"
        className={`mb-0.5 flex items-center gap-[11px] rounded-[5px] border-l-2 px-2.5 py-2.5 text-[14.5px] font-medium ${
          pathname === "/dashboard/settings"
            ? "border-margin bg-margin/[0.08] text-ink"
            : "border-transparent text-ink-soft hover:bg-ink/5 hover:text-ink"
        }`}
      >
        <span className="w-4 text-center font-mono text-[13px] text-ink-faint">
          *
        </span>
        Settings
      </Link>

      <div className="mt-auto flex items-center gap-2.5 border-t border-border pt-3 text-[13px] text-ink-soft">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-ink font-mono text-xs text-paper">
          JR
        </div>
        <div className="font-semibold text-ink">Reyes Studio</div>
      </div>
    </aside>
  );
}
