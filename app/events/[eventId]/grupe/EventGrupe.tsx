'use client';

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { groupParticipants, type Participant } from "@/lib/event-utils";

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const RoleBadge = ({ role }: { role: string }) => {
  if (role === "Participant") return null;
  return (
    <span
      className={cn(
        "text-[11px] font-bold uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-sm",
        role === "Lider" ? "bg-copper/15 text-copper" : "bg-ice text-royal",
      )}
    >
      {role}
    </span>
  );
};

const EventGrupe = ({ participants }: { participants: Participant[] }) => {
  const [query, setQuery] = useState("");
  const groups = useMemo(() => groupParticipants(participants), [participants]);
  const q = normalize(query.trim());

  const visible = q
    ? groups.filter((g) => g.members.some((m) => normalize(m.name).includes(q)))
    : groups;

  if (participants.length === 0) {
    return (
      <section className="container-site py-12">
        <h1 className="section-title">Grupe de lucru</h1>
        <p className="mt-4 text-ink-2">Repartizarea pe grupe va fi publicată în curând.</p>
      </section>
    );
  }

  return (
    <section className="container-site py-8 md:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <p className="kicker">Grupuri mici</p>
          <h1 className="section-title">Grupe de lucru</h1>
          <span className="copper-rule" />
        </div>
        <p className="text-sm text-ink-3">
          {groups.length} grupe · {participants.length} participanți
        </p>
      </div>

      <label className="relative block max-w-md mb-8">
        <span className="sr-only">Caută un nume</span>
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Caută-ți numele sau grupul…"
          className="w-full h-11 pl-10 pr-3 rounded-sm border border-ink bg-white text-[15px] placeholder:text-ink-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2"
        />
      </label>

      {visible.length === 0 ? (
        <p className="text-ink-2">Niciun participant cu numele „{query}”.</p>
      ) : (
        <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((g) => (
            <section key={g.leader} aria-labelledby={`grup-${g.leader}`}>
              <header className="border-b-2 border-royal pb-2 mb-1 flex items-baseline justify-between gap-3">
                <h2 id={`grup-${g.leader}`} className="font-display text-[24px] font-medium leading-tight">
                  Grupul {g.leader}
                </h2>
                <span className="text-sm text-ink-3 tabular-nums">{g.members.length}</span>
              </header>
              <ol>
                {g.members.map((m) => {
                  const hit = q && normalize(m.name).includes(q);
                  const passages = [m.text1, m.text2].filter(Boolean).join(" · ");
                  return (
                    <li
                      key={m.name}
                      className={cn(
                        "flex flex-wrap items-baseline gap-x-3 gap-y-0.5 py-2.5 border-t border-rule",
                        hit && "bg-copper/10 -mx-2 px-2",
                      )}
                    >
                      <span className={cn("text-[16px]", m.role === "Lider" ? "font-semibold" : "font-medium")}>
                        {m.name}
                      </span>
                      <RoleBadge role={m.role} />
                      {passages && m.role !== "Lider" && (
                        <span className="basis-full sm:basis-auto sm:ml-auto text-[13px] text-ink-3 tabular-nums">
                          {passages}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      )}
    </section>
  );
};

export default EventGrupe;
