import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventOrar from "./EventOrar";
import { getAllEvents, getEventById, getEventOrar } from "@/lib/events";

export function generateStaticParams() {
  return getAllEvents()
    .filter((e) => e.eventId)
    .map((e) => ({ eventId: e.eventId as string }));
}

export async function generateMetadata({ params }: { params: Promise<{ eventId: string }> }): Promise<Metadata> {
  const { eventId } = await params;
  const entry = getEventById(eventId);
  return {
    title: entry ? `Orar zilnic – ${entry.title}` : "Orar zilnic",
    description: "Programul zilnic al atelierului de predicare expozitivă.",
    robots: { index: false, follow: true },
  };
}

export default async function Page({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const entry = getEventById(eventId);
  if (!entry) notFound();
  return <EventOrar schedule={getEventOrar(eventId)} eventDate={entry.date} />;
}
