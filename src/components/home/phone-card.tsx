import { TbPhone } from "react-icons/tb";
import { site, telHref } from "@/content/site";

/**
 * The site's one conversion, styled as the field log's own "who to call"
 * line rather than a generic button — it appears once in the cover entry and
 * once again at the close, always in the same shape.
 */
export function PhoneCard({ label, note }: { label: string; note: string }) {
  const tel = telHref();
  if (!tel) return null;

  return (
    <div className="inline-flex flex-col gap-2 rounded-xl border-2 border-emerald px-5 py-4 transition hover:bg-emerald-soft sm:flex-row sm:items-center sm:gap-4">
      <a
        href={tel}
        className="flex items-center gap-2 text-lg font-semibold text-emerald-deep sm:text-xl"
      >
        <TbPhone className="h-5 w-5 shrink-0" aria-hidden="true" />
        {site.phone}
      </a>
      <p className="text-sm leading-snug text-charcoal-soft sm:max-w-[16rem] sm:border-l sm:border-emerald/25 sm:pl-4">
        <span className="sr-only">{label}. </span>
        {note}
      </p>
    </div>
  );
}
