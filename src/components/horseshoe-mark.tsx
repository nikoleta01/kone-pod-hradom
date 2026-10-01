import type { CSSProperties } from "react";

/** Nail holes, two per branch. */
const NAIL_HOLES: Array<[number, number]> = [
  [5.6, 10.5],
  [6.4, 15.2],
  [18.4, 10.5],
  [17.6, 15.2],
];

/**
 * The site's horseshoe, stroked in `currentColor`. Drawn like a real shoe:
 * the branches bow out slightly and the heels turn back in. `holeClassName`
 * fills the nail holes with the ground the mark sits on, so they read as
 * punched through.
 */
export function HorseshoeMark({
  className,
  holeClassName = "fill-cream",
  style,
}: {
  className?: string;
  holeClassName?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path
        d="M8.5,20.5 C5,17.5 4.5,13.5 5,10 C5.6,6 8.4,3.8 12,3.8 C15.6,3.8 18.4,6 19,10 C19.5,13.5 19,17.5 15.5,20.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {NAIL_HOLES.map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="0.95"
          className={holeClassName}
        />
      ))}
    </svg>
  );
}
