'use client';

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { daysFrom, getEventStatus, type EventStatus as Status } from "@/lib/event-utils";

interface StatusInfo {
  status: Status;
  days: number;
}

const subscribe = () => () => {};

/**
 * Starea evenimentului, calculată doar pe client: paginile sunt statice și
 * nu vrem un „peste 3 zile” rămas din ziua build-ului. Pe server e null.
 */
export function useEventStatus(date: string, dateEnd: string): StatusInfo | null {
  const key = useSyncExternalStore(
    subscribe,
    () => {
      const status = getEventStatus({ date, dateEnd });
      const days = status === "upcoming" ? daysFrom(date) : -daysFrom(dateEnd);
      return `${status}:${days}`;
    },
    () => null,
  );
  if (!key) return null;
  const [status, days] = key.split(":");
  return { status: status as Status, days: Number(days) };
}

/** Numărul de zile de la începutul evenimentului (0 = prima zi); null pe server. */
export function useDayOffset(date: string): number | null {
  const v = useSyncExternalStore(subscribe, () => String(-daysFrom(date)), () => null);
  return v === null ? null : Number(v);
}

export function statusLabel(info: StatusInfo | null, fallback = ""): string {
  if (!info) return fallback;
  if (info.status === "ongoing") return "În desfășurare";
  if (info.status === "upcoming") {
    if (info.days === 0) return "Începe astăzi";
    if (info.days === 1) return "Începe mâine";
    return `Peste ${info.days} de zile`;
  }
  if (info.days <= 1) return "S-a încheiat";
  if (info.days < 31) return `Acum ${info.days} de zile`;
  const months = Math.round(info.days / 30);
  if (months < 12) return months === 1 ? "Acum o lună" : `Acum ${months} luni`;
  const years = Math.round(info.days / 365);
  return years === 1 ? "Acum un an" : `Acum ${years} ani`;
}

interface EventStatusProps {
  date: string;
  dateEnd: string;
  /** Text afișat înaintea stării, de ex. „Atelier”. */
  prefix?: string;
  tone?: "light" | "dark";
  /** Ascunde tot elementul până când starea e calculată pe client. */
  hideUntilReady?: boolean;
  className?: string;
}

const EventStatusBadge = ({ date, dateEnd, prefix, tone = "dark", hideUntilReady, className }: EventStatusProps) => {
  const info = useEventStatus(date, dateEnd);
  const label = statusLabel(info);
  const live = info?.status === "ongoing";
  const upcoming = info?.status === "upcoming";

  return (
    <p
      className={cn(
        "kicker inline-flex items-center gap-2 min-h-[1.25rem]",
        tone === "light" ? "text-royal-light" : "text-ink-3",
        hideUntilReady && !info && "invisible",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "w-2 h-2 rounded-full",
          live ? "bg-copper animate-pulse" : upcoming ? "bg-copper" : tone === "light" ? "bg-royal-light" : "bg-rule",
          !info && "opacity-0",
        )}
      />
      {prefix && <span>{prefix}</span>}
      {prefix && label && <span aria-hidden="true">·</span>}
      <span className={cn(upcoming || live ? "text-copper" : "")}>{label}</span>
    </p>
  );
};

export default EventStatusBadge;
