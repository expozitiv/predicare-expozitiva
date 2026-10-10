import Link from "next/link";
import {
  UserPlus,
  FileText,
  Users,
  CalendarDays,
  BookOpen,
  MessageSquare,
  FileDown,
  ArrowRight,
  Lock,
  MapPin,
} from "lucide-react";
import { Mark } from "@/components/Logo";
import EventStatusBadge from "@/components/EventStatus";
import { Button } from "@/components/ui/button";
import { formatDateRange } from "@/lib/dates";
import type { EventEntry, ResolvedLink } from "@/lib/event-utils";

const iconMap: Record<string, React.ElementType> = {
  "user-plus": UserPlus,
  "file-text": FileText,
  users: Users,
  "calendar-days": CalendarDays,
  "book-open": BookOpen,
  "file-down": FileDown,
  "message-square": MessageSquare,
};

interface EventHubProps {
  entry: EventEntry;
  links: ResolvedLink[];
  stats: { days: number; participants: number; groups: number };
}

const EventHub = ({ entry, links, stats }: EventHubProps) => {
  const event = entry.event!;
  const register = links.find((l) => l.icon === "user-plus");
  const place = event.details.split("|")[1]?.trim() || entry.location;

  return (
    <>
      {/* Antet */}
      <section className="bg-royal text-white">
        <div className="container-site py-12 md:py-16 grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8 flex flex-col gap-4">
            <EventStatusBadge
              date={entry.date}
              dateEnd={entry.dateEnd}
              prefix={`Atelier · ${entry.location}`}
              tone="light"
            />
            <h1 className="font-display text-[36px] md:text-[52px] leading-[1.05] font-medium tracking-[-0.02em] text-white text-balance">
              {event.title}
            </h1>
            <p className="font-display italic text-[22px] md:text-[26px] text-royal-pale leading-snug">
              {event.subtitle}
            </p>
            <span className="copper-rule bg-copper-light" />
            <dl className="flex flex-wrap gap-x-8 gap-y-2 text-[15px] text-royal-pale">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-copper-light" aria-hidden="true" />
                <dt className="sr-only">Data</dt>
                <dd className="tabular-nums">{formatDateRange(entry.date, entry.dateEnd)}</dd>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-copper-light" aria-hidden="true" />
                <dt className="sr-only">Locul</dt>
                <dd>{place}</dd>
              </div>
            </dl>
          </div>
          <div className="hidden md:flex md:col-span-4 justify-end">
            <Mark lines={7} tone="white" size={168} />
          </div>
        </div>
      </section>

      {/* Conținut */}
      <section className="container-site py-10 md:py-14 grid gap-10 md:grid-cols-12">
        <aside className="md:col-span-4 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            {register?.enabled ? (
              <Button asChild size="lg" className="w-full md:w-auto md:self-start">
                <a href={register.href} target="_blank" rel="noopener noreferrer">
                  Înregistrare <ArrowRight />
                </a>
              </Button>
            ) : (
              <div className="flex items-start gap-3 border-t-2 border-rule pt-4 text-[15px] text-ink-3">
                <Lock size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                <p>Înscrierile nu sunt deschise în acest moment.</p>
              </div>
            )}
          </div>

          {(stats.participants > 0 || stats.days > 0) && (
            <dl className="grid grid-cols-3 gap-4 border-t-2 border-royal pt-5">
              {stats.days > 0 && (
                <div>
                  <dd className="font-display text-[32px] leading-none tabular-nums text-foreground">{stats.days}</dd>
                  <dt className="kicker mt-1.5">{stats.days === 1 ? "zi" : "zile"}</dt>
                </div>
              )}
              {stats.participants > 0 && (
                <div>
                  <dd className="font-display text-[32px] leading-none tabular-nums text-foreground">{stats.participants}</dd>
                  <dt className="kicker mt-1.5">participanți</dt>
                </div>
              )}
              {stats.groups > 0 && (
                <div>
                  <dd className="font-display text-[32px] leading-none tabular-nums text-foreground">{stats.groups}</dd>
                  <dt className="kicker mt-1.5">grupe</dt>
                </div>
              )}
            </dl>
          )}

          <div className="flex flex-col gap-2 border-t border-rule pt-5">
            <p className="kicker text-copper">Înainte de atelier</p>
            <p className="text-[15px] leading-relaxed text-ink-2">
              Lucrează prin cei 7 pași ai fișei pentru pasajele primite. Ghidul explică fiecare pas și
              întrebările frecvente.
            </p>
            <Link href="/ghid" className="arrow-link self-start">
              Ghid de pregătire <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </aside>

        <nav className="md:col-start-6 md:col-span-7" aria-label="Secțiunile evenimentului">
          <p className="kicker mb-1">Pe această pagină</p>
          <ol>
            {links.map((l, i) => {
              const Icon = iconMap[l.icon] ?? FileText;
              const rowClass = `grid grid-cols-[44px_minmax(0,1fr)_auto] gap-x-4 items-center py-4 ${
                i === 0 ? "border-t-2 border-royal" : "border-t border-rule"
              }`;

              if (!l.enabled) {
                return (
                  <li key={l.key} className={rowClass}>
                    <span className="w-11 h-11 rounded-sm bg-ice/70 text-ink-3/60 inline-flex items-center justify-center">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <span className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[17px] font-semibold text-ink-3">{l.name}</span>
                      <span className="text-[14px] text-ink-3/80">{l.description}</span>
                    </span>
                    <span className="kicker text-ink-3/70 inline-flex items-center gap-1.5">
                      <Lock size={12} aria-hidden="true" />
                      <span className="sr-only sm:not-sr-only">Indisponibil</span>
                    </span>
                  </li>
                );
              }

              const inner = (
                <>
                  <span className="w-11 h-11 rounded-sm bg-ice text-royal inline-flex items-center justify-center group-hover:bg-royal group-hover:text-white transition-colors">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <span className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[17px] font-semibold text-foreground group-hover:text-royal transition-colors">
                      {l.name}
                    </span>
                    <span className="text-[14px] text-ink-3">{l.description}</span>
                  </span>
                  <ArrowRight size={18} strokeWidth={1.5} className="text-royal" />
                </>
              );

              return (
                <li key={l.key} className="group">
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
                      {inner}
                    </a>
                  ) : (
                    <Link href={l.href} className={rowClass}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </section>
    </>
  );
};

export default EventHub;
