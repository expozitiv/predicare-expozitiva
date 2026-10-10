import type { Metadata } from "next";
import HomePage from "./HomePage";
import { getAllEvents } from "@/lib/events";

const BASE_URL = "https://predicare-expozitiva.ro";

export const metadata: Metadata = {
  title: "Ateliere de Predicare Expozitivă",
  description:
    "Ateliere de predicare expozitivă în România, în parteneriat cu Charles Simeon Trust. Formăm predicatori care mânuiesc drept Cuvântul adevărului.",
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Ateliere de Predicare Expozitivă",
    description:
      "Ateliere de predicare expozitivă în România, în parteneriat cu Charles Simeon Trust.",
    url: BASE_URL,
    images: [{ url: `${BASE_URL}/og.png` }],
  },
};

export default function Page() {
  const events = getAllEvents();
  return <HomePage events={events} />;
}
