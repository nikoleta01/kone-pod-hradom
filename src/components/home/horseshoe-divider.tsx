import { HorseshoeMark } from "@/components/horseshoe-mark";

/** The trail's color and height pattern, repeated along the row. */
const PATTERN = [
  { color: "text-brown", offset: 0 },
  { color: "text-emerald", offset: -4 },
  { color: "text-emerald-deep", offset: 3 },
  { color: "text-charcoal-soft", offset: -2 },
];

/**
 * How many shoes show at each width. Each shoe is a fixed 18px square, so
 * only the gaps flex; more shoes join as the column widens.
 */
const MOBILE_COUNT = 8;
const TABLET_COUNT = 12;
const DESKTOP_COUNT = 16;

function visibility(index: number): string {
  if (index < MOBILE_COUNT) return "";
  if (index < TABLET_COUNT) return "hidden sm:block";
  return "hidden md:block";
}

/**
 * A trail of horseshoes running the full width of the column. Used once on
 * the homepage, under "Meet the horses", so it stays a single flourish
 * rather than a repeated rule. Decorative only.
 */
export function HorseshoeDivider() {
  return (
    <div aria-hidden="true" className="flex items-center justify-between py-2">
      {Array.from({ length: DESKTOP_COUNT }, (_, index) => {
        const shoe = PATTERN[index % PATTERN.length];
        return (
          <HorseshoeMark
            key={index}
            className={`h-[18px] w-[18px] shrink-0 opacity-60 ${shoe.color} ${visibility(index)}`}
            style={{ transform: `translateY(${shoe.offset}px)` }}
          />
        );
      })}
    </div>
  );
}
