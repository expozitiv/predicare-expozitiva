'use client';

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useDayOffset } from "@/components/EventStatus";
import { classifySession, SESSION_LABEL, type DaySchedule } from "@/lib/event-utils";

interface EventOrarProps {
  schedule: DaySchedule[];
  eventDate: string;
}

const DayList = ({ day }: { day: DaySchedule }) => (
  <ol>
    {day.sessions.map((s, i) => {
      const kind = classifySession(s.title);
      const isBreak = kind === "break";
      const isGroup = kind === "group";
      return (
        <li
          key={`${s.time}-${i}`}
          className={cn(
            "grid grid-cols-[56px_minmax(0,1fr)] gap-x-3 border-t border-rule",
            isBreak ? "py-2" : "py-3.5",
            isGroup && "bg-ice -mx-3 px-3 border-t-ice-line",
          )}
        >
          <time
            className={cn(
              "tabular-nums text-[15px] pt-0.5",
              isBreak ? "text-ink-3" : "font-semibold text-royal",
            )}
          >
            {s.time}
          </time>
          <div className="min-w-0">
            {!isBreak && (
              <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-copper mb-0.5">
                {SESSION_LABEL[kind]}
              </span>
            )}
            <p className={cn("leading-snug", isBreak ? "italic text-ink-3 text-[15px]" : "font-medium text-foreground text-[16px]")}>
              {s.title}
            </p>
            {s.speaker && <p className="text-sm text-ink-3 mt-0.5">{s.speaker}</p>}
          </div>
        </li>
      );
    })}
  </ol>
);

const EventOrar = ({ schedule, eventDate }: EventOrarProps) => {
  // Pe telefon, ziua curentă e deschisă implicit dacă atelierul e în desfășurare.
  const [chosen, setChosen] = useState<number | null>(null);
  const offset = useDayOffset(eventDate);
  const todayIndex = offset !== null && offset >= 0 && offset < schedule.length ? offset : 0;
  const active = chosen ?? todayIndex;
  const setActive = setChosen;

  if (schedule.length === 0) {
    return (
      <section className="container-site py-12">
        <h1 className="section-title">Orar zilnic</h1>
        <p className="mt-4 text-ink-2">Programul va fi publicat în curând.</p>
      </section>
    );
  }

  const cols = Math.min(schedule.length, 3);

  return (
    <section className="container-site py-8 md:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <p className="kicker">Programul atelierului</p>
          <h1 className="section-title">Orar zilnic</h1>
          <span className="copper-rule" />
        </div>
        <p className="text-sm text-ink-3">
          {schedule.length} {schedule.length === 1 ? "zi" : "zile"} ·{" "}
          {schedule.reduce((n, d) => n + d.sessions.filter((s) => classifySession(s.title) !== "break").length, 0)} sesiuni
        </p>
      </div>

      {/* Telefon: o zi pe ecran, cu selector */}
      <div className="md:hidden">
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6 pb-4" role="tablist" aria-label="Zilele atelierului">
          {schedule.map((d, i) => (
            <button
              key={d.day}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "shrink-0 min-h-[44px] px-4 rounded-sm text-sm font-semibold border transition-colors",
                i === active ? "bg-royal text-white border-royal" : "border-rule text-ink-2 hover:border-royal",
              )}
            >
              {d.day}
            </button>
          ))}
        </div>
        <h2 className="font-display text-[24px] font-medium border-b-2 border-royal pb-2 mb-1">
          {schedule[active].day}
        </h2>
        <DayList day={schedule[active]} />
      </div>

      {/* Desktop: zilele una lângă alta */}
      <div
        className="hidden md:grid gap-x-10"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {schedule.map((d) => (
          <div key={d.day}>
            <h2 className="font-display text-[24px] font-medium border-b-2 border-royal pb-2 mb-1">{d.day}</h2>
            <DayList day={d} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventOrar;
