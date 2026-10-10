import fs from "fs";
import path from "path";
import type { EventEntry, DaySchedule, Participant } from "./event-utils";

export type { EventEntry, EventLink, EventMeta, DaySchedule, Session, Participant, Group } from "./event-utils";

const dataDir = () => path.join(process.cwd(), "public", "data");

function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

export function getAllEvents(): EventEntry[] {
  return readJson<EventEntry[]>(path.join(dataDir(), "evenimente.json"), []);
}

export function getEventById(eventId: string): EventEntry | undefined {
  return getAllEvents().find((e) => e.eventId === eventId);
}

export function getEventOrar(eventId: string): DaySchedule[] {
  const data = readJson<{ schedule?: DaySchedule[] }>(
    path.join(dataDir(), "events", eventId, "orar.json"),
    {},
  );
  return data.schedule ?? [];
}

export function getEventParticipants(eventId: string): Participant[] {
  return readJson<Participant[]>(path.join(dataDir(), "events", eventId, "participants.json"), []);
}

export function eventJsonLd(entry: EventEntry, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: entry.event ? `${entry.event.title} · ${entry.event.subtitle}` : entry.title,
    startDate: entry.date,
    endDate: entry.dateEnd,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: entry.location,
      address: { "@type": "PostalAddress", addressLocality: entry.location, addressCountry: "RO" },
    },
    organizer: {
      "@type": "Organization",
      name: "Predicare Expozitivă",
      url: baseUrl,
    },
    inLanguage: "ro",
    ...(entry.image ? { image: `${baseUrl}${entry.image}` } : {}),
    ...(entry.event?.subtitle ? { description: entry.event.subtitle } : {}),
    ...(entry.eventId ? { url: `${baseUrl}/events/${entry.eventId}` } : {}),
  };
}
