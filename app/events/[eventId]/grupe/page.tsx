import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventGrupe from "./EventGrupe";
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
    title: entry ? `Grupe de lucru – ${entry.title}` : "Grupe de lucru",
    description: "Grupurile mici și liderii lor.",
    robots: { index: false, follow: true },
  };
}

export default async function Page({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  if (!getEventById(eventId)) notFound();
  return <EventGrupe participants={getEventParticipants(eventId)} />;
}
