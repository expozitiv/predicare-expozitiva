'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { Mark } from "@/components/Logo";
import SubscribeForm from "@/components/SubscribeForm";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { EventEntry } from "@/lib/events";
import { formatDateRange, isUpcoming } from "@/lib/dates";

const quotes = [
  {
    text: "„Pune-ți pe inimă aceste lucruri, dedă-te în totul la ele, pentru ca înaintarea ta să fie văzută de toți.”",
    ref: "1 Timotei 4:15",
  },
  {
    text: "„Pe El Îl propovăduim noi, și sfătuim pe orice om, și învățăm pe orice om în toată înțelepciunea, ca să înfățișăm pe orice om desăvârșit în Cristos Isus.”",
    ref: "Coloseni 1:28",
  },
  {
    text: "„Toată Scriptura este insuflată de Dumnezeu și de folos ca să învețe, să mustre, să îndrepte, să dea înțelepciune în neprihănire.”",
    ref: "2 Timotei 3:16",
  },
];

const steps = [
  {
    title: "Pregătire anterioară",
    desc: "Cu câteva săptămâni înainte primești pasajele biblice și lucrezi prin cei 7 pași ai fișei de lucru.",
  },
  {
    title: "Grupuri mici",
    desc: "Ești repartizat într-un grup de 10 participanți, ghidat de un lider experimentat, unde prezinți și primești feedback.",
  },
  {
    title: "Expuneri și predici model",
    desc: "Momente cheie de expunere la predicarea sănătoasă a Cuvântului.",
  },
  {
    title: "Sesiuni de instruire",
    desc: "Sesiuni plenare de instruire și însușire a principiilor de lucru pe textul Scripturii.",
  },
];

const resources = [
  {
    title: "Ghid de pregătire a fișei de lucru",
    desc: "Cei 7 pași explicați, cu întrebări frecvente",
    href: "/ghid",
    tag: "Citește",
  },
  {
    title: "Fișa interactivă",
    desc: "Completează online cei 7 pași și generează PDF",
    href: "https://fisa.predicare-expozitiva.ro",
    tag: "Extern ↗",
  },
  {
    title: "Predicarea expozitivă · David Helm",
    desc: "Principii și practică, ediția în limba română",
    href: "https://www.magnagratia.org/carti/096-expository-preaching-helm/",
    tag: "Carte ↗",
  },
];

const ArrowLink = ({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) => {
  const inner = (
    <>
      {children}
      <ArrowRight size={18} strokeWidth={1.5} />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="arrow-link">{inner}</a>
  ) : (
    <Link href={href} className="arrow-link">{inner}</Link>
  );
};

const HomePage = ({ events }: { events: EventEntry[] }) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setQuoteIndex((p) => (p + 1) % quotes.length), 9000);
    return () => clearInterval(timer);
  }, []);

  const nextEvent = events
    .filter((e) => isUpcoming(e.dateEnd))
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  return (
    <Layout>
      {/* Hero: fotografie reală cu voal albastru, semnul mic în colț */}
      <section className="relative bg-royal-deep text-white overflow-hidden">
        <Image
          src="/gallery/photo-05.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45 saturate-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-royal-deep via-royal-deep/85 to-royal-deep/20" />
        <div className="relative container-site py-20 md:py-28">
          <div className="max-w-2xl flex flex-col gap-6">
            <p className="kicker text-royal-light">
              Ateliere de predicare expozitivă · România · cu Charles Simeon Trust
            </p>
            <h1 className="font-display text-[42px] md:text-[64px] leading-[1.04] font-medium tracking-[-0.02em] text-white text-balance">
              Predicare fidelă Scripturii, învățată în grupuri mici.
            </h1>
            <span className="copper-rule bg-copper-light" />
            <p className="text-lg md:text-xl leading-relaxed text-royal-pale max-w-xl">
              Formăm predicatori, păstori și lideri de studiu biblic care mânuiesc drept
              Cuvântul adevărului, folosind metoda și materialele Charles Simeon Trust.
            </p>
            <div className="flex flex-wrap gap-5 items-center pt-1">
              <Button asChild size="lg" variant="inverse">
                <Link href="/evenimente">Vezi evenimentele</Link>
              </Button>
              <Link href="/despre" className="arrow-link text-white border-white hover:text-copper-light hover:border-copper-light">
                Despre ateliere <ArrowRight size={18} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
        <Mark lines={5} tone="white" size={40} className="absolute right-6 bottom-6 md:right-10 md:bottom-10 opacity-90" />
      </section>

      {/* Următorul atelier */}
      <section className="container-site">
        <div className="border-b border-rule py-9 grid gap-5 md:grid-cols-12 md:gap-x-8 md:items-start">
          {nextEvent ? (
            <>
              <div className="md:col-span-4 flex flex-col gap-2.5">
                <p className="kicker text-copper flex items-center gap-2">
                  <span aria-hidden="true" className="w-2 h-2 rounded-full bg-copper" />
                  Următorul atelier
                </p>
                <p className="font-display text-[34px] md:text-[44px] leading-none font-medium tracking-[-0.02em] tabular-nums">
                  {formatDateRange(nextEvent.date, nextEvent.dateEnd)}
                </p>
              </div>
              <div className="md:col-span-5 flex flex-col gap-1.5">
                <p className="text-[22px] font-semibold leading-tight">
                  {nextEvent.event?.title ?? nextEvent.title}
                </p>
                {nextEvent.event?.subtitle && (
                  <p className="font-display italic text-lg text-ink-2">{nextEvent.event.subtitle}</p>
                )}
                <p className="text-[15px] text-ink-3">
                  {nextEvent.event?.details ?? nextEvent.location}
                </p>
              </div>
              <div className="md:col-span-3 flex md:justify-end">
                <Button asChild>
                  {nextEvent.link.startsWith("/") ? (
                    <Link href={nextEvent.link}>Detalii și înscriere</Link>
                  ) : (
                    <a href={nextEvent.link}>Detalii și înscriere</a>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="md:col-span-4 flex flex-col gap-2.5">
                <p className="kicker text-copper flex items-center gap-2">
                  <span aria-hidden="true" className="w-2 h-2 rounded-full bg-copper" />
                  Următorul atelier
                </p>
                <p className="font-display text-[28px] md:text-[34px] leading-none font-medium">Se anunță în curând</p>
              </div>
              <p className="md:col-span-5 text-[17px] text-ink-2 leading-relaxed">
                Atelierele se organizează de două ori pe an. Abonează-te ca să afli primul data și locul următorului atelier.
              </p>
              <div className="md:col-span-3 flex md:justify-end">
                <Button asChild>
                  <Link href="/abonare">Abonează-te</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Fotografie editorială */}
      <section className="container-site pt-16 pb-20">
        <figure className="flex flex-col gap-3">
          <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-sm overflow-hidden">
            <Image
              src="/gallery/CJ-6.jpeg"
              alt="Sesiune plenară în sala bisericii, atelierul din Cluj-Napoca"
              fill
              sizes="(min-width: 1168px) 1120px, 100vw"
              className="object-cover object-[50%_70%]"
            />
          </div>
          <figcaption className="flex justify-between gap-4 text-sm text-ink-3">
            <span>Sesiune plenară, atelierul din Cluj-Napoca</span>
            <span className="kicker font-medium">Fotografie: arhiva atelierelor</span>
          </figcaption>
        </figure>
      </section>

      {/* Despre */}
      <section className="container-site pb-20">
        <div className="editorial-grid">
          <div className="col-head">
            <p className="num-label">01 — Despre</p>
            <h2 className="section-title">Ce este un atelier de predicare expozitivă?</h2>
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
              a fost fondat pentru a promova creșterea Evangheliei lui Isus Cristos în întreaga lume prin
              formarea următoarei generații de predicatori expozitivi.
            </p>
            <p className="prose-body">
              Organizăm aceste ateliere în România în parteneriat cu Charles Simeon Trust, folosind integral
              metoda și materialele lor. Scopul este să crească încrederea și abilitatea fiecărui participant
              de a mânui corect Cuvântul lui Dumnezeu. Dorim ca fiecare participant să plece convins că
              Cuvântul lui Dumnezeu este puternic și dornic să-l predea oamenilor săi.
            </p>
            <p className="prose-body">
              Atelierele sunt deschise păstorilor și predicatorilor, liderilor de studii biblice, studenților
              la teologie și tuturor celor pasionați de predicare. Nu este necesară experiență anterioară.
            </p>
            <ArrowLink href="/despre">Mai multe despre ateliere</ArrowLink>
          </div>
        </div>
      </section>

      {/* Cum se desfășoară */}
      <section className="container-site pb-24">
        <div className="editorial-grid">
          <div className="col-head">
            <p className="num-label">02 — Cum se desfășoară</p>
            <h2 className="section-title">Trei zile de lucru pe text</h2>
            <span className="copper-rule" />
          </div>
          <ol className="col-body">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className={`grid grid-cols-[56px_minmax(0,1fr)] gap-x-4 py-6 ${
                  i === 0 ? "border-t-2 border-royal" : "border-t border-rule"
                } ${i === steps.length - 1 ? "border-b border-rule" : ""}`}
              >
                <span className="font-display text-[26px] leading-none text-copper">{i + 1}</span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-body text-[22px] font-semibold leading-tight">{s.title}</h3>
                  <p className="text-[17px] leading-relaxed text-ink-2">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Verset */}
      <section className="bg-royal-deep text-white">
        <div className="container-site py-20 flex flex-col gap-6 items-start">
          <div className="relative min-h-[6.5em] md:min-h-[5em] w-full max-w-4xl">
            {quotes.map((q, i) => (
              <p
                key={q.ref}
                aria-hidden={i !== quoteIndex}
                className={`font-display italic text-[26px] md:text-[38px] leading-[1.3] text-white transition-opacity duration-700 ${
                  i === quoteIndex ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
                }`}
              >
                {q.text}
              </p>
            ))}
          </div>
          <span className="copper-rule bg-copper-light" />
          <div className="flex items-center gap-6">
            <p className="kicker text-copper-light">{quotes[quoteIndex].ref}</p>
            <div className="flex gap-2" role="tablist" aria-label="Versete">
              {quotes.map((q, i) => (
                <button
                  key={q.ref}
                  role="tab"
                  aria-selected={i === quoteIndex}
                  onClick={() => setQuoteIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === quoteIndex ? "w-6 bg-copper-light" : "w-2 bg-white/35 hover:bg-white/60"
                  }`}
                  aria-label={`Versetul ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mărturie */}
      <section className="container-site py-24">
        <div className="grid gap-8 md:grid-cols-12 md:gap-x-8 md:items-center">
          <div className="md:col-span-5 relative aspect-[4/3] md:aspect-[5/4] rounded-sm overflow-hidden">
            <Image
              src="/gallery/CJ-3.jpeg"
              alt="Doi participanți cu ecusoane discutând în pauză"
              fill
              sizes="(min-width: 768px) 460px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-start-7 md:col-span-6 flex flex-col gap-6">
            <p className="num-label">03 — Ce spun participanții</p>
            <blockquote className="font-display text-[24px] md:text-[27px] leading-[1.4]">
              „CST nu este un simplu seminar, este o echipare necesară pentru toți care știu că mai au de
              învățat. Instrumentele învățate sunt asemenea unei perechi de ochelari care înlătură ceața și
              îți aduc claritate în vedere.”
            </blockquote>
            <p className="text-[15px] font-semibold">
              Ruben Bratu <span className="text-ink-3 font-normal">· participant</span>
            </p>
            <ArrowLink href="/despre#marturii">Toate mărturiile</ArrowLink>
          </div>
        </div>
      </section>

      {/* Resurse */}
      <section className="bg-ice border-y border-rule">
        <div className="container-site py-20">
          <div className="editorial-grid">
            <div className="col-head">
              <p className="num-label">04 — Resurse</p>
              <h2 className="section-title">Pentru pregătire</h2>
              <span className="copper-rule" />
            </div>
            <div className="col-body">
              {resources.map((r, i) => {
                const external = r.href.startsWith("http");
                const cls = `list-row ${i === 0 ? "list-row-first" : "border-ice-line"} ${
                  i === resources.length - 1 ? "border-b border-ice-line" : ""
                } group`;
                const inner = (
                  <>
                    <span className="flex flex-col gap-1">
                      <span className="font-display text-[22px] font-medium leading-tight group-hover:text-royal transition-colors">
                        {r.title}
                      </span>
                      <span className="text-base text-ink-3">{r.desc}</span>
                    </span>
                    <span className="kicker text-royal whitespace-nowrap">{r.tag}</span>
                  </>
                );
                return external ? (
                  <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                ) : (
                  <Link key={r.href} href={r.href} className={cls}>{inner}</Link>
                );
              })}
              <div className="pt-6">
                <ArrowLink href="/resurse">Toate resursele</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Abonare */}
      <section className="container-site py-20">
        <div className="grid gap-6 md:grid-cols-12 md:gap-x-8 md:items-center">
          <div className="md:col-span-5 flex flex-col gap-3">
            <h2 className="font-display text-[30px] md:text-[34px] leading-tight font-medium tracking-[-0.015em]">
              Află de următorul atelier
            </h2>
            <p className="text-[17px] leading-relaxed text-ink-2">
              Trimitem un email de două ori pe an, înainte de fiecare atelier. Fără spam, dezabonare oricând.
            </p>
          </div>
          <div className="md:col-start-7 md:col-span-6">
            <SubscribeForm layout="inline" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
