import Link from "next/link";
import { Mark } from "./Logo";

const navLinks = [
  { label: "Evenimente", href: "/evenimente" },
  { label: "Resurse", href: "/resurse" },
  { label: "Ghid de pregătire", href: "/ghid" },
  { label: "Despre", href: "/despre" },
  { label: "Contact", href: "/contact" },
  { label: "Abonare", href: "/abonare" },
];

const partners = [
  { label: "Charles Simeon Trust", href: "https://simeontrust.org/" },
  { label: "Biserica Unu Unu, Cluj", href: "https://unu-unu.ro" },
  { label: "Biserica Sfânta Treime, Brăila", href: "https://www.facebook.com/sfantatreimebraila" },
];

const SiteFooter = () => (
  <footer className="bg-royal-deep text-royal-light">
    <div className="container-site py-14 flex flex-col gap-10">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <Mark lines={5} tone="white" size={26} />
            <p className="font-display text-[22px] font-semibold text-white">
              Ateliere de predicare expozitivă
            </p>
          </div>
          <p className="text-[15px] leading-relaxed max-w-sm">
            În parteneriat cu Charles Simeon Trust, formăm următoarea generație de
            predicatori expozitivi în România.
          </p>
        </div>

        <div className="md:col-span-3 flex flex-col gap-2.5">
          <p className="kicker text-copper-light mb-1">Navigare</p>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-[15px] hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="md:col-span-4 flex flex-col gap-2.5">
          <p className="kicker text-copper-light mb-1">Parteneri</p>
          {partners.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] hover:text-white transition-colors"
            >
              {p.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-royal-line pt-5 flex flex-col sm:flex-row justify-between gap-2 text-[13px] text-royal-soft">
        <span>© {new Date().getFullYear()} Ateliere de predicare expozitivă</span>
        <span>
          Realizat cu bune intenții de{" "}
          <a
            href="https://expozitiv.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-royal-light border-b border-royal-line hover:text-white transition-colors"
          >
            Studio Expozitiv
          </a>
        </span>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
