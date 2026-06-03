"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface NavbarProps {
  theme: Theme;
}

export function Navbar({ theme }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-card-border bg-card/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navigation principale"
      >
        <Link
          href="/"
          className="text-lg font-bold text-foreground transition-colors hover:text-accent"
        >
          {siteConfig.firstName}
          <span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex" role="list">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-[var(--radius)] px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent-muted text-accent"
                      : "text-muted hover:bg-muted-bg hover:text-foreground",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle initialTheme={theme} />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius)] border border-card-border bg-card md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "border-t border-card-border bg-card md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <ul className="flex flex-col p-4" role="list">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-[var(--radius)] px-3 py-3 text-base font-medium",
                    active ? "bg-accent-muted text-accent" : "text-foreground",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
