'use client';

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { sortParticipants, type Participant } from "@/lib/event-utils";

const ROLES = ["Lider", "Ucenic", "Participant"] as const;

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const roleClass: Record<string, string> = {
  Lider: "bg-copper/15 text-copper",
  Ucenic: "bg-ice text-royal",
  Participant: "bg-ice/60 text-ink-3",
};

const RoleBadge = ({ role }: { role: string }) => (
  <span className={cn("inline-block text-[11px] font-bold uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-sm", roleClass[role] ?? roleClass.Participant)}>
    {role}
  </span>
);

const EventParticipanti = ({ participants }: { participants: Participant[] }) => {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<string | null>(null);

  const sorted = useMemo(() => sortParticipants(participants), [participants]);
  const q = normalize(query.trim());
  const visible = sorted.filter(
    (p) => (!role || p.role === role) && (!q || normalize(p.name).includes(q) || normalize(p.group).includes(q)),
  );

  const count = (r: string) => participants.filter((p) => p.role === r).length;

  if (participants.length === 0) {
    return (
      <section className="container-site py-12">
        <h1 className="section-title">Participanți</h1>
        <p className="mt-4 text-ink-2">Lista participanților va fi publicată în curând.</p>
      </section>
    );
  }

  return (
    <section className="container-site py-8 md:py-12">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <p className="kicker">Cine participă</p>
          <h1 className="section-title">Participanți</h1>
          <span className="copper-rule" />
        </div>
        <dl className="flex gap-6 sm:gap-8">
          {[
            { label: "total", value: participants.length },
            { label: "lideri", value: count("Lider") },
            { label: "ucenici", value: count("Ucenic") },
            { label: "participanți", value: count("Participant") },
          ].map((s) => (
            <div key={s.label}>
              <dd className="font-display text-[28px] leading-none tabular-nums">{s.value}</dd>
              <dt className="kicker mt-1">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <label className="relative block flex-1 max-w-md">
          <span className="sr-only">Caută un nume sau un grup</span>
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Caută un nume sau un grup…"
            className="w-full h-11 pl-10 pr-3 rounded-sm border border-ink bg-white text-[15px] placeholder:text-ink-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2"
          />
        </label>
        <div className="flex gap-2 overflow-x-auto no-scrollbar" role="group" aria-label="Filtrează după rol">
          <button
            onClick={() => setRole(null)}
            aria-pressed={role === null}
            className={cn(
              "shrink-0 min-h-[44px] px-4 rounded-sm text-sm font-semibold border transition-colors",
              role === null ? "bg-royal text-white border-royal" : "border-rule text-ink-2 hover:border-royal",
            )}
          >
            Toți
          </button>
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => setRole(role === r ? null : r)}
              aria-pressed={role === r}
              className={cn(
                "shrink-0 min-h-[44px] px-4 rounded-sm text-sm font-semibold border transition-colors",
                role === r ? "bg-royal text-white border-royal" : "border-rule text-ink-2 hover:border-royal",
              )}
            >
              {r === "Participant" ? "Participanți" : `${r}i`}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-ink-2">Niciun rezultat{query ? ` pentru „${query}”` : ""}.</p>
      ) : (
        <>
          {/* Desktop: tabel */}
          <table className="hidden md:table w-full text-[15px]">
            <thead>
              <tr className="border-b-2 border-royal text-left">
                <th className="kicker font-semibold py-2.5 pr-4">Nume</th>
                <th className="kicker font-semibold py-2.5 pr-4">Rol</th>
                <th className="kicker font-semibold py-2.5 pr-4">Grup</th>
                <th className="kicker font-semibold py-2.5 pr-4">Pasajul 1</th>
                <th className="kicker font-semibold py-2.5">Pasajul 2</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((p) => (
                <tr key={p.name} className="border-t border-rule hover:bg-ice/50 transition-colors">
                  <td className="py-2.5 pr-4 font-medium text-foreground">{p.name}</td>
                  <td className="py-2.5 pr-4"><RoleBadge role={p.role} /></td>
                  <td className="py-2.5 pr-4 text-ink-2">{p.group}</td>
                  <td className="py-2.5 pr-4 text-ink-3 tabular-nums">{p.text1 || "—"}</td>
                  <td className="py-2.5 text-ink-3 tabular-nums">{p.text2 || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Telefon: listă */}
          <ol className="md:hidden">
            {visible.map((p, i) => (
              <li key={p.name} className={cn("py-3 flex flex-col gap-1", i === 0 ? "border-t-2 border-royal" : "border-t border-rule")}>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-[16px]">{p.name}</span>
                  <RoleBadge role={p.role} />
                </div>
                <div className="flex flex-wrap gap-x-3 text-[13px] text-ink-3">
                  <span>Grupul {p.group}</span>
                  {(p.text1 || p.text2) && (
                    <span className="tabular-nums">{[p.text1, p.text2].filter(Boolean).join(" · ")}</span>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-ink-3">{visible.length} din {participants.length}</p>
        </>
      )}
    </section>
  );
};

export default EventParticipanti;
