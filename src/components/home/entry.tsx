import type { ReactNode } from "react";

/** One homepage section in the shared column: a heading, then a body. */
export function Entry({ children }: { children: ReactNode }) {
  return <div className="py-10 first:pt-0 last:pb-0">{children}</div>;
}

/** The shared column that stacks successive `Entry` sections. */
export function LogSpine({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>;
}
