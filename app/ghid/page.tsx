import type { Metadata } from "next";
import GhidPage from "./GhidPage";

const BASE_URL = "https://predicare-expozitiva.ro";

export const metadata: Metadata = {
  title: "Ghid de Pregătire",
  description:
    "Ghid complet pentru pregătirea fișei de lucru: structură, context, ideea centrală, legătura cu Evanghelia, aplicații și schița predicii.",
  alternates: { canonical: `${BASE_URL}/ghid` },
  openGraph: {
    title: "Ghid de Pregătire | Predicare Expozitivă",
    description:
      "Ghid complet pentru pregătirea fișei de lucru în 7 pași.",
    url: `${BASE_URL}/ghid`,
    images: [{ url: `${BASE_URL}/og.png` }],
  },
};

export default function Page() {
  return <GhidPage />;
}
