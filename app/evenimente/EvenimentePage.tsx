'use client';

import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SubscribeForm from "@/components/SubscribeForm";
import EventStatusBadge from "@/components/EventStatus";
import { Mark } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { formatDateRange, formatDays, formatMonthYear, isUpcoming } from "@/lib/dates";
import { resolveEventLinks, type EventEntry } from "@/lib/event-utils";

const galleryStrip = [
  { src: "/gallery/CJ-1.jpeg", alt: "Sesiune plenară în sala bisericii" },
  { src: "/gallery/CJ-3.jpeg", alt: "Participanți discutând în pauză" },
  { src: "/gallery/photo-05.jpeg", alt: "Grup mic lucrând pe text" },
  { src: "/gallery/CJ-5.jpeg", alt: "Atelier de predicare expozitivă" },
];

const EvenimentePage = ({ events }: { events: EventEntry[] }) => {
  const upcoming = events.filter((e) => isUpcoming(e.dateEnd)).sort((a, b) => a.date.localeCompare(b.date));
  const past = events.filter((e) => !isUpcoming(e.dateEnd)).sort((a, b) => b.date.localeCompare(a.date));
  // Fără atelier viitor, evidențiem cel mai recent atelier care are pagină proprie.
  const featured = upcoming[0] ?? past.find((e) => e.eventId) ?? past[0];
  const featuredIsUpcoming = upcoming.length > 0;
  const otherUpcoming = upcoming.slice(1);

  const cities = Array.from(new Set(events.map((e) => e.location)));
  const years = Array.from(new Set(past.map((e) => new Date(e.date).getFullYear()))).sort((a, b) => b - a);

  return (
    <Layout>
      <PageHeader
        kicker="Evenimente"
        title="Atelierele din România"
        intro="Atelierele de predicare expozitivă se organizează de două ori pe an, în diferite orașe din țară. Trei zile de lucru pe text, în grupuri mici, cu lideri experimentați."
      />

      {/* Evenimentul principal */}
      {featured && (
        <section className="container-site pt-12 md:pt-16">
          <p className="kicker text-copper flex items-center gap-2 mb-5">
            <span aria-hidden="true" className="w-2 h-2 rounded-full bg-copper" />
            {featuredIsUpcoming ? "Următorul atelier" : "Din atelierele recente"}
          </p>
          <FeaturedEvent event={featured} />
        </section>
      )}

      {/* Alte evenimente viitoare */}
      {otherUpcoming.length > 0 && (
        <section className="container-site pt-16">
          <div className="flex items-baseline justify-between border-b-2 border-royal pb-3">
            <h2 className="section-subtitle">Urmează</h2>
            <span className="kicker">{otherUpcoming.length === 1 ? "1 atelier" : `${otherUpcoming.length} ateliere`}</span>
          </div>
          {otherUpcoming.map((e, i) => (
            <EventRow key={e.eventId ?? `${e.date}-${e.location}`} event={e} first={i === 0} />
          ))}
        </section>
      )}

      {/* Când nu e nimic programat: abonare, direct */}
      {!featuredIsUpcoming && (
        <section className="container-site pt-16">
          <div className="bg-ice border border-ice-line rounded-sm px-6 py-8 md:px-10 md:py-10 grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-6 flex flex-col gap-2">
              <p className="kicker text-copper">Următorul atelier</p>
              <h2 className="font-display text-[28px] md:text-[32px] leading-tight font-medium">
                Se anunță în curând
              </h2>
              <p className="text-[16px] leading-relaxed text-ink-2">
                Data și orașul următorului atelier apar aici și în email, de obicei cu două luni înainte.
              </p>
            </div>
            <div className="md:col-start-8 md:col-span-5">
              <SubscribeForm layout="inline" />
            </div>
          </div>
        </section>
      )}

      {/* Pe scurt + fotografii */}
      <section className="container-site pt-16 md:pt-20">
        <div className="grid gap-8 md:grid-cols-12 md:items-end mb-6">
          <dl className="md:col-span-7 flex gap-8 sm:gap-12">
            {[
              { value: events.length, label: events.length === 1 ? "atelier" : "ateliere" },
              { value: cities.length, label: cities.length === 1 ? "oraș" : "orașe" },
              { value: 2, label: "pe an" },
            ].map((s) => (
              <div key={s.label}>
                <dd className="font-display text-[40px] md:text-[48px] leading-none tabular-nums">{s.value}</dd>
                <dt className="kicker mt-2">{s.label}</dt>
              </div>
            ))}
          </dl>
          <p className="md:col-start-9 md:col-span-4 text-[15px] text-ink-3 leading-relaxed">
            {cities.join(" · ")}. Fiecare atelier are propria pagină cu orar, grupe de lucru și lista participanților.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {galleryStrip.map((g, i) => (
            <Link
              key={g.src}
              href="/despre"
              className={`relative aspect-[4/3] rounded-sm overflow-hidden bg-ice group ${i >= 2 ? "hidden sm:block" : ""}`}
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(min-width: 768px) 280px, 50vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Ateliere trecute: cronologie */}
      {past.length > 0 && (
        <section className="container-site pt-16 md:pt-20 pb-20">
          <div className="flex items-baseline justify-between border-b-2 border-royal pb-3 mb-2">
            <h2 className="section-subtitle">Ateliere trecute</h2>
            <span className="kicker">{past.length === 1 ? "1 atelier" : `${past.length} ateliere`}</span>
          </div>
          {years.map((year) => (
            <div key={year} className="grid md:grid-cols-12 md:gap-x-8">
              <div className="md:col-span-2 pt-6">
                <p className="font-display text-[28px] leading-none text-royal tabular-nums">{year}</p>
              </div>
              <ol className="md:col-span-10 relative border-l border-rule ml-1.5 md:ml-0">
                {past
                  .filter((e) => new Date(e.date).getFullYear() === year)
                  .map((e) => (
                    <TimelineRow key={e.eventId ?? `${e.date}-${e.location}`} event={e} />
                  ))}
              </ol>
            </div>
          ))}
        </section>
      )}

      {/* Abonare, când există deja un eveniment viitor */}
      {featuredIsUpcoming && (
        <section className="container-site pt-16 pb-20">
          <div className="border-t-2 border-royal pt-8 grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-6 flex flex-col gap-2">
              <h2 className="section-subtitle">Nu rata următorul atelier</h2>
              <p className="text-[17px] text-ink-2 leading-relaxed">
                Primești un email înainte de fiecare atelier și când apar resurse noi.
              </p>
            </div>
            <div className="md:col-start-8 md:col-span-5">
              <SubscribeForm layout="inline" />
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

const FeaturedEvent = ({ event }: { event: EventEntry }) => {
  const links = resolveEventLinks(event);
  const register = links.find((l) => l.icon === "user-plus");
  const hasPage = Boolean(event.eventId && event.link.startsWith("/"));
  const isMail = event.link.startsWith("mailto:");

  return (
    <div className="grid gap-8 md:grid-cols-12">
      <div className="md:col-span-6 relative aspect-[4/3] md:aspect-auto md:min-h-[380px] rounded-sm overflow-hidden bg-royal-deep">
        {event.image ? (
          <Image
            src={event.image}
            alt={`${event.title}, ${event.location}`}
            fill
            priority
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Mark lines={7} tone="white" size={140} />
          </div>
        )}
        <EventStatusBadge
          date={event.date}
          dateEnd={event.dateEnd}
          hideUntilReady
          className="absolute left-4 top-4 bg-white/95 rounded-sm px-3 py-1.5"
        />
      </div>

      <div className="md:col-span-6 flex flex-col justify-center gap-4">
        <p className="font-display text-[34px] md:text-[44px] leading-none font-medium tracking-[-0.02em] tabular-nums">
          {formatDateRange(event.date, event.dateEnd)}
        </p>
        <h2 className="text-[24px] md:text-[28px] font-semibold leading-tight">
          {event.event?.title ?? event.title}
        </h2>
        {event.event?.subtitle && (
          <p className="font-display italic text-xl text-ink-2">{event.event.subtitle}</p>
        )}
        <p className="flex items-center gap-2 text-[15px] text-ink-3">
          <MapPin size={16} aria-hidden="true" />
          {event.event?.details.split("|")[1]?.trim() || event.location}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          {hasPage && (
            <Button asChild size="lg">
              <Link href={event.link}>
                Pagina evenimentului <ArrowRight />
              </Link>
            </Button>
          )}
          {register?.enabled && (
            <Button asChild size="lg" variant={hasPage ? "outline" : "default"}>
              <a href={register.href} target="_blank" rel="noopener noreferrer">Înscriere</a>
            </Button>
          )}
          {!hasPage && isMail && (
            <Button asChild size="lg">
              <a href={event.link}>Înscriere prin email</a>
            </Button>
          )}
        </div>
        {hasPage && (
          <p className="text-sm text-ink-3">Orar, grupe de lucru și lista participanților, pe pagina evenimentului.</p>
        )}
      </div>
    </div>
  );
};

const EventRow = ({ event, first }: { event: EventEntry; first?: boolean }) => {
  const internal = event.link.startsWith("/");
  const cls = `group grid gap-y-2 md:grid-cols-[200px_minmax(0,1fr)_auto] md:gap-x-8 md:items-baseline py-6 ${
    first ? "" : "border-t border-rule"
  }`;
  const inner = (
    <>
      <span className="flex flex-col gap-1">
        <span className="font-display text-[26px] leading-none font-medium tabular-nums">
          {formatDays(event.date, event.dateEnd)}
        </span>
        <span className="text-sm text-ink-3">{new Date(event.date).getFullYear()}</span>
      </span>
      <span className="flex flex-col gap-1 min-w-0">
        <span className="text-[20px] font-semibold leading-tight group-hover:text-royal transition-colors">
          {event.event?.title ?? event.title}
          {event.event?.subtitle ? (
            <span className="font-display italic font-normal text-ink-2"> · {event.event.subtitle}</span>
          ) : null}
        </span>
        <span className="text-[15px] text-ink-3">{event.location}</span>
      </span>
      <span className="arrow-link md:justify-self-end">
        {internal ? "Pagina evenimentului" : "Înscriere"} <ArrowRight size={18} strokeWidth={1.5} />
      </span>
    </>
  );
  return internal ? <Link href={event.link} className={cls}>{inner}</Link> : <a href={event.link} className={cls}>{inner}</a>;
};

const TimelineRow = ({ event }: { event: EventEntry }) => {
  const hasPage = Boolean(event.eventId && event.link.startsWith("/"));
  const content = (
    <>
      <span aria-hidden="true" className="absolute -left-[5px] top-7 w-[9px] h-[9px] rounded-full bg-copper ring-4 ring-white" />
      <span className="flex flex-col gap-1 min-w-0">
        <span className="kicker">
          {event.dateApprox ? (
            <>
              {formatMonthYear(event.date)} <span className="text-ink-3/70 normal-case tracking-normal font-medium">· dată estimată</span>
            </>
          ) : (
            formatDays(event.date, event.dateEnd)
          )}
        </span>
        <span className="text-[20px] font-semibold leading-tight group-hover:text-royal transition-colors">
          {event.event?.title ?? event.title}
          {event.event?.subtitle ? (
            <span className="font-display italic font-normal text-ink-2"> · {event.event.subtitle}</span>
          ) : null}
        </span>
        <span className="flex items-center gap-1.5 text-[15px] text-ink-3">
          <MapPin size={14} aria-hidden="true" /> {event.location}
        </span>
      </span>
      {hasPage && (
        <span className="arrow-link md:justify-self-end">
          Orar, grupe, participanți <ArrowRight size={18} strokeWidth={1.5} />
        </span>
      )}
    </>
  );
  const cls = "group relative grid gap-y-2 md:grid-cols-[minmax(0,1fr)_auto] md:gap-x-8 md:items-center py-6 pl-6 border-t border-rule first:border-t-0";
  return (
    <li>
      {hasPage ? <Link href={event.link} className={cls}>{content}</Link> : <div className={cls}>{content}</div>}
    </li>
  );
};

export default EvenimentePage;
