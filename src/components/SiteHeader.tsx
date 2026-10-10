'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Wordmark } from "./Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Evenimente", path: "/evenimente" },
  { label: "Resurse", path: "/resurse" },
  { label: "Ghid", path: "/ghid" },
  { label: "Despre", path: "/despre" },
  { label: "Contact", path: "/contact" },
];

const SiteHeader = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-rule">
      <div className="container-site flex items-center justify-between h-[68px] gap-6">
        <Wordmark />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Navigare principală">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              aria-current={isActive(item.path) ? "page" : undefined}
              className={cn(
                "py-1.5 text-[15px] font-medium border-b-2 transition-colors",
                isActive(item.path)
                  ? "text-royal border-copper"
                  : "text-ink-2 border-transparent hover:text-royal",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/abonare"
            className="inline-flex items-center h-9 px-4 rounded-sm bg-royal text-white text-sm font-semibold hover:bg-royal-deep transition-colors"
          >
            Abonare
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden -mr-2 w-11 h-11 inline-flex items-center justify-center text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Închide meniul" : "Deschide meniul"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white border-b border-rule"
            aria-label="Navigare mobilă"
          >
            <div className="container-site py-3 flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "py-3 text-base font-medium border-t border-rule first:border-t-0",
                    isActive(item.path) ? "text-royal" : "text-ink-2",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/abonare"
                onClick={() => setMobileOpen(false)}
                className="mt-3 mb-2 inline-flex items-center justify-center h-11 rounded-sm bg-royal text-white font-semibold"
              >
                Abonare
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SiteHeader;
