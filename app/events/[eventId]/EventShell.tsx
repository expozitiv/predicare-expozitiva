'use client';

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Mark } from "@/components/Logo";
import { cn } from "@/lib/utils";
import type { EventEntry, ResolvedLink } from "@/lib/event-utils";

interface EventShellProps {
  entry: EventEntry;
  links: ResolvedLink[];
  children: ReactNode;
}

const EventShell = ({ entry, links, children }: EventShellProps) => {
  const pathname = usePathname();
  const base = `/events/${entry.eventId}`;
  const isHub = pathname === base;

  const tabs = [
    { href: base, label: "Prezentare" },
    ...links
      .filter((l) => l.enabled && l.href.startsWith(`${base}/`))
      .map((l) => ({ href: l.href, label: l.name })),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-royal-deep text-white sticky top-0 z-40">
        <div className="container-site h-14 flex items-center justify-between gap-4">
          <Link href={base} className="flex items-center gap-2.5 min-w-0 hover:text-royal-pale transition-colors">
            <Mark lines={5} tone="white" size={24} />
            <span className="font-display font-semibold text-[17px] truncate">
              {entry.event?.title ?? entry.title}
            </span>
          </Link>
          <Link
            href="/evenimente"
            className="shrink-0 inline-flex items-center gap-1.5 text-[13px] font-medium text-royal-light hover:text-white transition-colors min-h-[44px]"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Toate evenimentele</span>
            <span className="sm:hidden">Evenimente</span>
          </Link>
        </div>

        {!isHub && (
          <nav className="border-t border-royal-line" aria-label="Secțiunile evenimentului">
            <div className="container-site flex gap-1 overflow-x-auto no-scrollbar">
              {tabs.map((t) => {
                const active = pathname === t.href;
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "shrink-0 px-3 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                      active
                        ? "text-white border-copper-light"
                        : "text-royal-light border-transparent hover:text-white",
                    )}
                  >
                    {t.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-rule mt-10">
        <div className="container-site py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] text-ink-3">
          <Link href="/" className="inline-flex items-center gap-2 font-display font-semibold text-base text-royal-deep hover:text-royal transition-colors">
            <Mark lines={5} size={20} />
            Predicare expozitivă
          </Link>
          <span>© {new Date().getFullYear()} Ateliere de predicare expozitivă</span>
        </div>
      </footer>
    </div>
  );
};

export default EventShell;
