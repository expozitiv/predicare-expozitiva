import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventParticipanti from "./EventParticipanti";
import { getAllEvents, getEventById, getEventParticipants } from "@/lib/events";

export function generateStaticParams() {
  return getAllEvents()
    .filter((e) => e.eventId)
    .map((e) => ({ eventId: e.eventId as string }));
}

export async function generateMetadata({ params }: { params: Promise<{ eventId: string }> }): Promise<Metadata> {
  const { eventId } = await params;
  const entry = getEventById(eventId);
  return {
    title: entry ? `Participanți – ${entry.title}` : "Participanți",
    description: "Lista participanților la atelier.",
    robots: { index: false, follow: true },
  };
}

export default async function Page({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  if (!getEventById(eventId)) notFound();
  return <EventParticipanti participants={getEventParticipants(eventId)} />;
}
