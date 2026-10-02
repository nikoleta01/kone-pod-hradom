import { TbPhone } from "react-icons/tb";
import { site, telHref } from "@/content/site";

/**
 * The site's one conversion: a solid button carrying the number, with one
 * short line under it. It appears once in the cover entry and once again at
 * the close, always in the same shape.
 */
export function PhoneCard({ label, note }: { label: string; note: string }) {
  const tel = telHref();
  if (!tel) return null;

  return (
    <div className="flex flex-col items-start gap-2">
      <a
        href={tel}
        className="inline-flex items-center gap-2.5 rounded-full bg-emerald px-5 py-3.5 text-lg font-semibold text-cream transition hover:bg-emerald-deep"
      >
        <TbPhone className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span className="sr-only">{label}: </span>
        {site.phone}
      </a>
      <p className="text-sm text-charcoal-soft">{note}</p>
    </div>
  );
}
