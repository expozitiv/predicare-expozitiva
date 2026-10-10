import Link from "next/link";
import { cn } from "@/lib/utils";

/*
 * Marca „schița în șapte linii”: rânduri de text care devin schița predicii.
 * Șapte linii pentru semnul mare, cinci pentru header și favicon.
 * Prima linie e cuprie: ideea centrală a autorului.
 */

type Tone = "blue" | "white" | "mono";

interface MarkProps {
  lines?: 5 | 7;
  tone?: Tone;
  size?: number;
  /** Indexul (0-based) al liniei evidențiate; implicit prima. */
  active?: number;
  className?: string;
}

const SEVEN = [
  { x: 4, w: 20 },
  { x: 8, w: 14 },
  { x: 8, w: 11 },
  { x: 4, w: 18 },
  { x: 8, w: 12 },
  { x: 4, w: 20 },
  { x: 8, w: 10 },
];

const FIVE = [
  { x: 4, w: 20 },
  { x: 8, w: 14 },
  { x: 4, w: 18 },
  { x: 8, w: 11 },
  { x: 4, w: 20 },
];

export const Mark = ({ lines = 5, tone = "blue", size = 28, active = 0, className }: MarkProps) => {
  const rows = lines === 7 ? SEVEN : FIVE;
  const h = lines === 7 ? 2 : 3;
  const step = lines === 7 ? 4 : 5.5;
  const top = lines === 7 ? 1 : 2;
  const base = tone === "white" ? "#FFFFFF" : tone === "mono" ? "#C5D0E6" : "#1848A8";
  const hot = tone === "white" ? "#E8A27A" : "#C9683F";

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 28 28"
      className={cn("shrink-0", className)}
    >
      {rows.map((r, i) => (
        <rect key={i} x={r.x} y={top + i * step} width={r.w} height={h} fill={i === active ? hot : base} />
      ))}
    </svg>
  );
};

interface WordmarkProps {
  tone?: "blue" | "white";
  href?: string;
  className?: string;
}

export const Wordmark = ({ tone = "blue", href = "/", className }: WordmarkProps) => (
  <Link
    href={href}
    className={cn(
      "inline-flex items-center gap-2.5 font-display text-[21px] font-semibold tracking-[-0.01em] transition-colors",
      tone === "white" ? "text-white hover:text-royal-pale" : "text-royal-deep hover:text-royal",
      className,
    )}
  >
    <Mark lines={5} tone={tone} size={28} />
    <span>Predicare expozitivă</span>
  </Link>
);

export default Mark;
