/*
 * Tipuri și funcții pure pentru evenimente. Fără fs: pot fi importate
 * din componente client. Încărcarea din disc stă în events.ts.
 */

export interface EventLink {
  name: string;
  url: string;
  icon: string;
  active: boolean;
}

export interface EventMeta {
  title: string;
  subtitle: string;
  details: string;
}

export interface EventEntry {
  date: string;
  dateEnd: string;
  /** Data exactă nu e cunoscută; afișăm doar luna și anul. */
  dateApprox?: boolean;
  title: string;
  location: string;
  type: string;
  link: string;
  eventId?: string;
  /** Fotografie reprezentativă, din /public. */
  image?: string;
  urlInregistrare?: string;
  urlFeedback?: string;
  event?: EventMeta;
  links?: EventLink[];
}

export interface Session {
  time: string;
  title: string;
  speaker: string;
  pageInPrint?: boolean;
}

export interface DaySchedule {
  day: string;
  sessions: Session[];
}

export interface Participant {
  name: string;
  role: string;
  group: string;
  text1: string;
  text2: string;
}

export interface Group {
  leader: string;
  members: Participant[];
}

export type EventStatus = "upcoming" | "ongoing" | "past";

export interface ResolvedLink {
  key: string;
  name: string;
  description: string;
  href: string;
  icon: string;
  enabled: boolean;
  external: boolean;
}

const ROLE_PRIORITY: Record<string, number> = { Lider: 0, Ucenic: 1, Participant: 2 };

const LINK_DESCRIPTIONS: Record<string, string> = {
  "user-plus": "Formularul de înscriere la atelier",
  "file-text": "Cine participă și în ce grup este",
  users: "Repartizarea pe grupuri mici și liderii lor",
  "calendar-days": "Programul fiecărei zile, sesiune cu sesiune",
  "book-open": "Cei 7 pași ai fișei de lucru, explicați",
  "file-down": "Mapa participantului, în format PDF",
  "message-square": "Spune-ne cum a fost, în două minute",
};

/** Sub-paginile micro-site-ului care există cu adevărat. */
const KNOWN_SUBPAGES = new Set(["participanti", "grupe", "orar"]);

export function isPlaceholderUrl(url?: string): boolean {
  if (!url) return true;
  const u = url.trim();
  return u === "" || u === "#" || /PLACEHOLDER/i.test(u);
}

export function resolveEventLinks(entry: EventEntry): ResolvedLink[] {
  const base = `/events/${entry.eventId ?? ""}`;
  return (entry.links ?? []).map((l) => {
    let href = l.url.trim();
    if (href === "$inregistrare") href = entry.urlInregistrare ?? "";
    if (href === "$feedback") href = entry.urlFeedback ?? "";

    const external = /^(https?:|mailto:)/.test(href);
    const siteInternal = href.startsWith("/");
    const subpage = !external && !siteInternal ? href : "";
    const placeholder = isPlaceholderUrl(href);

    const enabled =
      l.active && !placeholder && (external || siteInternal || KNOWN_SUBPAGES.has(subpage));

    return {
      key: subpage || l.icon,
      name: l.name.trim(),
      description: LINK_DESCRIPTIONS[l.icon] ?? "",
      href: subpage ? `${base}/${subpage}` : href,
      icon: l.icon,
      enabled,
      external,
    };
  });
}

export function getEventStatus(entry: Pick<EventEntry, "date" | "dateEnd">, now = new Date()): EventStatus {
  const start = new Date(entry.date);
  const end = new Date(entry.dateEnd);
  end.setHours(23, 59, 59, 999);
  if (now < start) return "upcoming";
  if (now > end) return "past";
  return "ongoing";
}

/** Zile întregi până la început (pozitiv) sau de la sfârșit (negativ). */
export function daysFrom(dateStr: string, now = new Date()): number {
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  const n = new Date(now);
  n.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - n.getTime()) / 86400000);
}

export function sortParticipants(list: Participant[]): Participant[] {
  return [...list].sort(
    (a, b) =>
      (ROLE_PRIORITY[a.role] ?? 9) - (ROLE_PRIORITY[b.role] ?? 9) ||
      a.name.localeCompare(b.name, "ro"),
  );
}

export function groupParticipants(list: Participant[]): Group[] {
  const map = new Map<string, Participant[]>();
  list.forEach((p) => {
    const key = p.group || "Fără grup";
    map.set(key, [...(map.get(key) ?? []), p]);
  });
  return Array.from(map.entries())
    .map(([leader, members]) => ({ leader, members: sortParticipants(members) }))
    .sort((a, b) => a.leader.localeCompare(b.leader, "ro"));
}

export type SessionKind = "break" | "group" | "expo" | "session" | "other";

export function classifySession(title: string): SessionKind {
  const t = title.toLowerCase();
  if (/^(pauză|pauza|prânz|pranz|sosire|încheiere|incheiere)/.test(t)) return "break";
  if (t.startsWith("grup mic")) return "group";
  if (t.startsWith("expunere")) return "expo";
  if (t.startsWith("sesiunea") || t.startsWith("sesiune")) return "session";
  return "other";
}

export const SESSION_LABEL: Record<SessionKind, string> = {
  break: "",
  group: "Grup mic",
  expo: "Expunere",
  session: "Instruire",
  other: "Împreună",
};
