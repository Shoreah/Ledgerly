"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "##" },
  { href: "/dashboard/invoices", label: "Invoices", icon: "$" },
  { href: "/dashboard/clients", label: "Clients", icon: "@" },
];

export default function Sidebar({ user }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const email = user?.email ?? "";
  const initials = email ? email.slice(0, 2).toUpperCase() : "??";

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <>
      <div className="sticky top-0 z-30 hidden items-center gap-3 border-b border-border bg-paper px-4 py-3 max-[860px]:flex">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="p-1 text-ink"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className="flex items-baseline gap-2 font-serif text-[17px] font-semibold">
          Ledgerly
        </div>
      </div>

      {mobileOpen && (
        <div
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-ink/35 min-[861px]:hidden"
        />
      )}

      <aside
        className={`z-50 flex h-dvh w-[232px] flex-shrink-0 flex-col overflow-y-auto overscroll-contain border-r border-border bg-paper px-[18px] py-[26px] transition-transform duration-200 min-[861px]:sticky min-[861px]:top-0 min-[861px]:translate-x-0 max-[860px]:fixed max-[860px]:inset-y-0 max-[860px]:left-0 ${
          mobileOpen
            ? "max-[860px]:translate-x-0"
            : "max-[860px]:-translate-x-full"
        }`}
      >
        <div className="mb-[30px] flex items-baseline justify-between gap-2 px-2 font-serif text-[19px] font-semibold">
          <span className="flex items-baseline gap-2">
            Ledgerly
            <span className="rounded-[3px] border border-border px-1.5 py-0.5 font-mono text-[10px] text-ink-soft">
              No. 001
            </span>
          </span>
          <button
            onClick={closeMobile}
            aria-label="Close menu"
            className="p-1 text-ink-soft hover:text-ink min-[861px]:hidden"
          >
            &times;
          </button>
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
              onClick={closeMobile}
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

        <div className="mt-auto border-t border-border pt-3 pb-[env(safe-area-inset-bottom)]">
          <div className="flex items-center gap-2.5 text-[13px] text-ink-soft">
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-ink font-mono text-xs text-paper">
              {initials}
            </div>
            <div className="truncate font-semibold text-ink">{email}</div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-2.5 flex w-full items-center gap-[11px] rounded-[5px] px-2.5 py-2 text-[13.5px] font-medium text-ink-soft hover:bg-ink/5 hover:text-ink"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="flex-shrink-0"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}