import { notFound } from "next/navigation";
import EventShell from "./EventShell";
import { getEventById } from "@/lib/events";
import { resolveEventLinks } from "@/lib/event-utils";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const entry = getEventById(eventId);
  if (!entry || !entry.event) notFound();

  return (
    <EventShell entry={entry} links={resolveEventLinks(entry)}>
      {children}
    </EventShell>
  );
}
