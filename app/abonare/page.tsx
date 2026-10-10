import type { Metadata } from "next";
import AbonarePage from "./AbonarePage";

const BASE_URL = "https://predicare-expozitiva.ro";

export const metadata: Metadata = {
  title: "Abonare",
  description:
    "Abonează-te pentru a primi noutăți despre atelierele de predicare expozitivă, resurse și evenimente viitoare.",
  alternates: { canonical: `${BASE_URL}/abonare` },
  openGraph: {
    title: "Abonare | Predicare Expozitivă",
    description:
      "Abonează-te pentru a primi noutăți despre atelierele de predicare expozitivă.",
    url: `${BASE_URL}/abonare`,
    images: [{ url: `${BASE_URL}/og.png` }],
  },
};

export default function Page() {
  return <AbonarePage />;
}
