import type { Metadata } from "next";
import DespreePage from "./DespreePage";
import { getGalleryImages } from "@/lib/gallery";

const BASE_URL = "https://predicare-expozitiva.ro";

export const metadata: Metadata = {
  title: "Despre Ateliere",
  description:
    "Descoperă ce este un Atelier de Predicare Expozitivă, metodologia în 7 pași și cum te poți implica în formarea predicatorilor din România.",
  alternates: { canonical: `${BASE_URL}/despre` },
  openGraph: {
    title: "Despre Ateliere | Predicare Expozitivă",
    description:
      "Descoperă ce este un Atelier de Predicare Expozitivă și metodologia în 7 pași.",
    url: `${BASE_URL}/despre`,
    images: [{ url: `${BASE_URL}/og.png` }],
  },
};

export default function Page() {
  return <DespreePage images={getGalleryImages()} />;
}
