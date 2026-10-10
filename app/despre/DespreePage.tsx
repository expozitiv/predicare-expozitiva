"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const testimonials = [
  {
    text: "Puține resurse au capacitatea de a-i forma atât pe cei mai puțin experimentați, cât și pe cei avansați. Workshopurile CST reușesc acest lucru printr-o experiență unică și profund matură. Cu fiecare participare am plecat îmbogățit și, indiferent de nivelul la care mă aflam, am simțit că instrumentele mele hermeneutice au devenit mai ascuțite.",
    author: "Todi Croitoru",
  },
  {
    text: "Participarea la seminariile CST au însemnat pentru mine zile binecuvântate de instruire pentru slujire. Accentul clar pus pe textul Scripturii, predările clare și grupurile mici în care am primit feedback — toate acestea fac din CST un context de instruire de care sper să aibă parte cât mai mulți slujitori ai Cuvântului din România.",
    author: "Pavel Trifu",
  },
  {
    text: "CST nu este un simplu seminar, este o echipare necesară pentru toți care știu că mai au de învățat. Instrumentele învățate sunt asemenea unei perechi de ochelari care înlătură ceața și îți aduce claritate în vedere.",
    author: "Ruben Bratu",
  },
  {
    text: "Dacă consideri că a înțelege ceea ce vrea să spună Scriptura este important, dacă crezi că rolul unui predicator sau învățător al Bibliei are un mandat divin să predice mesajul Scripturii, dacă te vezi neputincios în a face acest lucru și vrei să înveți cum să o faci în mod consecvent, atunci îți recomand cu căldura seminariile organizate de Simeon Trust. Personal, după ce am participat pentru prima data la acest seminar, mi s-a schimbat radical modul în care ascult o predica și modul în care mă raportez la textul Biblic. Soli Deo Gloria!",
    author: "Andrei Bușui",
  },
];

const activities = [
  {
    title: "Pregătire anterioară",
    desc: "Cu câteva săptămâni înainte, vei primi pasajele biblice și vei lucra prin cei 7 pași ai fișei de lucru.",
  },
  {
    title: "Grupuri mici",
    desc: "Vei fi repartizat într-un grup de 10 participanți, ghidat de un lider experimentat, unde vei prezenta și primi feedback.",
  },
  {
    title: "Expuneri și predici",
    desc: "Momente cheie de expunere a participanților la predicarea sănătoasă a Cuvântului.",
  },
  {
    title: "Sesiuni de instruire",
    desc: "Sesiuni plenare de instruire și însușire a principiilor de lucru pe textul Scripturii.",
  },
];

const audiences = [
  "păstori și predicatori",
  "lideri de studii biblice",
  "studenți la teologie",
  "pasionați de predicare",
];

const sectionNav = [
  { id: "misiune", label: "Misiune" },
  { id: "galerie", label: "Din ateliere" },
  { id: "la-atelier", label: "La atelier" },
  { id: "participanti", label: "Cui se adresează" },
  { id: "marturii", label: "Mărturii" },
];

const TEASER_COUNT = 5;

interface DespreePageProps {
  images: { src: string; alt: string }[];
}

const DespreePage = ({ images: galleryImages }: DespreePageProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((p) => (p !== null ? (p + 1) % galleryImages.length : null));
      if (e.key === "ArrowLeft")
        setLightboxIndex((p) => (p !== null ? (p - 1 + galleryImages.length) % galleryImages.length : null));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, galleryImages.length]);

  return (
    <Layout>
      <PageHeader
        kicker="Despre ateliere"
        title="Ce este un atelier de predicare expozitivă?"
        intro="Trei zile de lucru pe textul Scripturii, în grupuri mici, cu feedback de la lideri experimentați, după metoda Charles Simeon Trust."
      >
        <nav aria-label="Secțiunile paginii" className="mt-10 pt-5 border-t border-royal-line">
          <ol className="flex flex-wrap gap-x-6 gap-y-2">
            {sectionNav.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-2 min-h-[32px] text-[14px] font-medium text-royal-light hover:text-white transition-colors"
                >
                  <span className="font-display text-copper-light tabular-nums">0{i + 1}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </PageHeader>

      {/* Misiune */}
      <section id="misiune" className="container-site py-16 md:py-20 scroll-mt-20">
        <div className="editorial-grid">
          <div className="col-head">
            <p className="num-label">01 — Misiune</p>
            <h2 className="section-title">Predicatori care mânuiesc drept Cuvântul</h2>
            <span className="copper-rule" />
          </div>
          <div className="col-body flex flex-col gap-5">
            <p className="lede">
              <a
                href="https://simeontrust.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-royal border-b border-royal hover:text-copper hover:border-copper transition-colors"
              >
                Charles Simeon Trust
              </a>{" "}
              formează următoarea generație de predicatori expozitivi prin ateliere practice, cursuri
              online și programe intensive.
            </p>
            <p className="prose-body">
              Organizăm aceste ateliere în România folosind integral metoda și materialele lor. Scopul:
              să crească încrederea și abilitatea participanților de a mânui corect Cuvântul lui Dumnezeu.
            </p>
          </div>
        </div>
      </section>

      {/* Galerie: un rând de aperitiv, restul la cerere; click deschide lightbox-ul */}
      <section id="galerie" className="container-site pb-20 scroll-mt-20">
        <div className="flex items-baseline justify-between border-b-2 border-royal pb-3 mb-6">
          <h2 className="section-subtitle">Din ateliere</h2>
          <span className="kicker">{galleryImages.length} fotografii</span>
        </div>

        {/* Rândul de aperitiv */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {galleryImages.slice(0, TEASER_COUNT).map((img, i) => {
            const total = galleryImages.length;
            // Pe telefon se văd 2 fotografii, pe tabletă 3, pe desktop 5:
            // butonul „+N” stă mereu pe ultima vizibilă.
            const overlay =
              i === 1 ? { cls: "flex sm:hidden", n: total - 2 }
              : i === 2 ? { cls: "hidden sm:flex md:hidden", n: total - 3 }
              : i === TEASER_COUNT - 1 ? { cls: "hidden md:flex", n: total - TEASER_COUNT }
              : null;
            const hiddenCls = galleryOpen ? "" : `${i >= 2 ? "hidden sm:block" : ""} ${i >= 3 ? "sm:hidden md:block" : ""}`;
            return (
              <div key={img.src} className={`relative aspect-[4/3] rounded-sm overflow-hidden bg-ice ${hiddenCls}`}>
                <button
                  onClick={() => setLightboxIndex(i)}
                  className="absolute inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2"
                  aria-label={`Deschide fotografia ${i + 1}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 220px, 50vw"
                    className="object-cover hover:scale-[1.03] transition-transform duration-500"
                    priority={i < 3}
                  />
                </button>
                {overlay && overlay.n > 0 && !galleryOpen && (
                  <button
                    onClick={() => setGalleryOpen(true)}
                    className={`absolute inset-0 flex-col items-center justify-center gap-1 bg-royal-deep/80 text-white hover:bg-royal-deep/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 ${overlay.cls}`}
                    aria-expanded={galleryOpen}
                    aria-controls="galerie-completa"
                  >
                    <span className="font-display text-[32px] leading-none">+{overlay.n}</span>
                    <span className="kicker text-royal-light">Toate fotografiile</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Restul galeriei, la cerere */}
        {galleryOpen && galleryImages.length > TEASER_COUNT && (
          <div id="galerie-completa" className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryImages.slice(TEASER_COUNT).map((img, j) => {
              const i = j + TEASER_COUNT;
              return (
                <button
                  key={img.src}
                  onClick={() => setLightboxIndex(i)}
                  className="relative aspect-[4/3] rounded-sm overflow-hidden bg-ice focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2"
                  aria-label={`Deschide fotografia ${i + 1}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 280px, 50vw"
                    className="object-cover hover:scale-[1.03] transition-transform duration-500"
                  />
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[15px] text-ink-3">
            {galleryOpen
              ? "Click pe o fotografie pentru a o vedea mare. Săgețile schimbă fotografia."
              : "Mai jos: cum se desfășoară un atelier, cui se adresează și ce spun participanții."}
          </p>
          {galleryOpen ? (
            <button onClick={() => setGalleryOpen(false)} className="arrow-link">
              Restrânge galeria
            </button>
          ) : (
            <a href="#la-atelier" className="arrow-link">
              Continuă cu atelierul <ChevronRight size={16} strokeWidth={1.5} />
            </a>
          )}
        </div>
      </section>

      {/* Ce vei face */}
      <section id="la-atelier" className="bg-ice border-y border-rule scroll-mt-20">
        <div className="container-site py-16 md:py-20">
          <div className="editorial-grid">
            <div className="col-head">
              <p className="num-label">02 — La atelier</p>
              <h2 className="section-title">Ce vei face la atelier?</h2>
              <span className="copper-rule" />
            </div>
            <ol className="col-body">
              {activities.map((a, i) => (
                <li
                  key={a.title}
                  className={`grid grid-cols-[56px_minmax(0,1fr)] gap-x-4 py-6 ${
                    i === 0 ? "border-t-2 border-royal" : "border-t border-ice-line"
                  } ${i === activities.length - 1 ? "border-b border-ice-line" : ""}`}
                >
                  <span className="font-display text-[26px] leading-none text-copper">{i + 1}</span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-body text-[22px] font-semibold leading-tight">{a.title}</h3>
                    <p className="text-[17px] leading-relaxed text-ink-2">{a.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Cui se adresează */}
      <section id="participanti" className="container-site py-16 md:py-20 scroll-mt-20">
        <div className="editorial-grid">
          <div className="col-head">
            <p className="num-label">03 — Participanți</p>
            <h2 className="section-title">Cui se adresează?</h2>
            <span className="copper-rule" />
          </div>
          <div className="col-body flex flex-col gap-5">
            <p className="lede">
              Atelierele sunt deschise tuturor celor care doresc să crească în abilitatea de a studia și
              prezenta Scriptura cu fidelitate:{" "}
              {audiences.map((a, i) => (
                <span key={a}>
                  <span className="text-royal font-medium">{a}</span>
                  {i < audiences.length - 2 ? ", " : i === audiences.length - 2 ? " și " : "."}
                </span>
              ))}
            </p>
            <p className="prose-body">Nu este necesar să ai experiență anterioară în predicare.</p>
          </div>
        </div>
      </section>

      {/* Mărturii: toate, static */}
      <section id="marturii" className="container-site pb-20 scroll-mt-20">
        <div className="flex items-baseline justify-between border-b-2 border-royal pb-3 mb-2">
          <h2 className="section-subtitle">Ce spun participanții</h2>
          <span className="kicker">{testimonials.length} mărturii</span>
        </div>
        <div className="grid md:grid-cols-2 gap-x-10">
          {testimonials.map((t, i) => (
            <blockquote
              key={t.author}
              className={`py-8 flex flex-col gap-4 border-t border-rule ${i < 2 ? "md:border-t-0" : ""}`}
            >
              <p className="font-display text-[20px] md:text-[22px] leading-[1.45] text-foreground">„{t.text}”</p>
              <footer className="text-[15px] font-semibold">
                {t.author} <span className="text-ink-3 font-normal">· participant</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-site pb-20">
        <div className="border-t-2 border-royal pt-8 grid gap-6 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6 flex flex-col gap-2">
            <h2 className="section-subtitle">Vrei să participi?</h2>
            <p className="text-[17px] text-ink-2 leading-relaxed">
              Verifică evenimentele viitoare sau contactează-ne pentru mai multe detalii.
            </p>
          </div>
          <div className="md:col-start-8 md:col-span-5 flex flex-wrap gap-3 md:justify-end">
            <Button asChild size="lg">
              <Link href="/evenimente">Vezi evenimente</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contactează-ne</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && galleryImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-royal-deep/95"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Galerie foto"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 w-11 h-11 inline-flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors z-10"
              aria-label="Închide"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
              }}
              className="absolute left-2 sm:left-6 w-11 h-11 inline-flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors z-10"
              aria-label="Poza anterioară"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
              }}
              className="absolute right-2 sm:right-6 w-11 h-11 inline-flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors z-10"
              aria-label="Poza următoare"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-4 kicker text-royal-light">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default DespreePage;
