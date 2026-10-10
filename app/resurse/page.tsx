import type { Metadata } from "next";
import ResursePage from "./ResursePage";

const BASE_URL = "https://predicare-expozitiva.ro";

export const metadata: Metadata = {
  title: "Resurse",
  description:
    "Ghiduri, podcasturi și materiale utile pentru predicarea expozitivă. Resurse de la Charles Simeon Trust și parteneri.",
  alternates: { canonical: `${BASE_URL}/resurse` },
  openGraph: {
    title: "Resurse | Predicare Expozitivă",
    description:
      "Ghiduri, podcasturi și materiale utile pentru predicarea expozitivă.",
    url: `${BASE_URL}/resurse`,
    images: [{ url: `${BASE_URL}/og.png` }],
  },
};

export default function Page() {
  return <ResursePage />;
}
