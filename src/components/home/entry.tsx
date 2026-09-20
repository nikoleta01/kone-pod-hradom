import type { ReactNode } from "react";

/** One dated entry on the spine: a hole-punch mark on the rule, a heading, a body. */
export function Entry({ children }: { children: ReactNode }) {
  return <div className="relative py-10 first:pt-0 last:pb-0">{children}</div>;
}

export function EntryDot() {
  return (
    <span
      aria-hidden="true"
      className="absolute -left-[29px] top-2 h-3 w-3 rounded-full border-2 border-cream bg-brown sm:-left-[37px]"
    />
  );
}

/** The bound spine — a single rule line down the left edge — that chains successive `Entry` sections together. */
export function LogSpine({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="border-l-2 border-brown/30 pl-8 sm:pl-10">{children}</div>
    </div>
  );
}
