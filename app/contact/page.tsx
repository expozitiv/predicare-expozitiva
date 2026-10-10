import type { Metadata } from "next";
import ContactPage from "./ContactPage";

const BASE_URL = "https://predicare-expozitiva.ro";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactează echipa pentru întrebări despre atelierele de predicare expozitivă, înscrieri sau parteneriate.",
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: "Contact | Predicare Expozitivă",
    description:
      "Contactează echipa pentru întrebări despre atelierele de predicare expozitivă.",
    url: `${BASE_URL}/contact`,
    images: [{ url: `${BASE_URL}/og.png` }],
  },
};

export default function Page() {
  return <ContactPage />;
}
