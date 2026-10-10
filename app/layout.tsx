import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/next";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source",
  display: "swap",
});

const BASE_URL = "https://predicare-expozitiva.ro";
const SITE_NAME = "Predicare Expozitivă – Ateliere de predicare";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: "%s | Predicare Expozitivă",
  },
  description:
    "Ateliere de predicare expozitivă în România, în parteneriat cu Charles Simeon Trust. Formăm predicatori care mânuiesc drept Cuvântul adevărului.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "ro_RO",
    url: BASE_URL,
    title: SITE_NAME,
    description:
      "Ateliere de predicare expozitivă în România, în parteneriat cu Charles Simeon Trust.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Predicare expozitivă – Ateliere de predicare expozitivă",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Ateliere de predicare expozitivă în România, în parteneriat cu Charles Simeon Trust.",
    images: ["/og.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Predicare Expozitivă",
  alternateName: SITE_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/web-app-manifest-512x512.png`,
  description:
    "Ateliere de predicare expozitivă în România, în parteneriat cu Charles Simeon Trust.",
  sameAs: ["https://simeontrust.org/"],
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: BASE_URL,
  inLanguage: "ro",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Predicare expozitiva" />
        <meta name="theme-color" content="#1848A8" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
