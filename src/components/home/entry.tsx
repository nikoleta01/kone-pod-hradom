import type { ReactNode } from "react";

/** One homepage section in the shared column: a heading, then a body. */
export function Entry({ id, children }: { id?: string; children: ReactNode }) {
  // scroll-mt keeps an anchored section's heading clear of the sticky header.
  return (
    <div id={id} className="scroll-mt-28 py-5 first:pt-0 last:pb-0 sm:py-10">
      {children}
    </div>
  );
}

/** The shared column that stacks successive `Entry` sections. */
export function LogSpine({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16 md:pt-20">{children}</div>
  );
}
