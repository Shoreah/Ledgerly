"use client";

import { useEffect, useState } from "react";

export default function LedgerCard() {
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setReplayKey((k) => k + 1);
    }, 5200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      key={replayKey}
      className="play relative overflow-hidden rounded-lg border border-border bg-paper px-[26px] pb-[22px] pt-[26px] shadow-[0_20px_44px_-22px_rgba(28,42,34,0.35)]"
    >
      <div className="mb-2 flex items-center justify-between border-b border-border pb-3.5">
        <span className="font-mono text-xs uppercase tracking-[0.06em] text-ink-soft">
          Invoice — Reyes Studio
        </span>
        <span className="rounded-[3px] border border-gold/40 px-1.5 py-0.5 font-mono text-[11px] text-gold">
          Draft
        </span>
      </div>

      <div className="ledger-row r1 grid grid-cols-[60px_1fr_auto] items-baseline gap-2.5 border-b border-dashed border-border py-2.5">
        <span className="font-mono text-xs text-ink-soft">001</span>
        <span className="text-[14.5px] text-ink">Homepage redesign</span>
        <span className="font-mono text-[14.5px] font-medium">$1,200.00</span>
      </div>
      <div className="ledger-row r2 grid grid-cols-[60px_1fr_auto] items-baseline gap-2.5 border-b border-dashed border-border py-2.5">
        <span className="font-mono text-xs text-ink-soft">002</span>
        <span className="text-[14.5px] text-ink">Logo refinement</span>
        <span className="font-mono text-[14.5px] font-medium">$450.00</span>
      </div>
      <div className="ledger-row r3 grid grid-cols-[60px_1fr_auto] items-baseline gap-2.5 border-b border-dashed border-border py-2.5">
        <span className="font-mono text-xs text-ink-soft">003</span>
        <span className="text-[14.5px] text-ink">Brand guidelines</span>
        <span className="font-mono text-[14.5px] font-medium">$300.00</span>
      </div>

      <div className="ledger-total total mt-3.5 flex items-baseline justify-between border-t-[3px] border-double border-ink pt-3.5">
        <span className="font-mono text-[12.5px] uppercase tracking-[0.06em] text-ink-soft">
          Total due
        </span>
        <span className="font-mono text-[22px] font-bold">$1,950.00</span>
      </div>

      <div className="stamp-wrap absolute bottom-3.5 right-5">
        <div
          className="rounded-md border-[3px] border-stamp px-4 py-1.5 font-mono text-[26px] font-bold uppercase tracking-[0.09em] text-stamp"
          style={{ transform: "rotate(-9deg)" }}
        >
          Paid
        </div>
      </div>
    </div>
  );
}
