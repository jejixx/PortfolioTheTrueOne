"use client";

import { ArrowUp, GitBranch, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { navLinks, siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="border-t border-card-border bg-muted-bg">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-foreground">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-muted">
              {siteConfig.title} — option {siteConfig.option}
            </p>
            <p className="mt-1 text-sm text-muted">{siteConfig.location}</p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">
              Navigation
            </p>
            <ul className="grid grid-cols-2 gap-2 text-sm" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">Contact</p>
            <ul className="space-y-2 text-sm" role="list">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 text-muted hover:text-accent"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted hover:text-accent"
                >
                  <Github className="h-4 w-4" aria-hidden />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.gitea}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted hover:text-accent"
                >
                  <GitBranch className="h-4 w-4" aria-hidden />
                  Gitea (lycée)
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted hover:text-accent"
                >
                  <Linkedin className="h-4 w-4" aria-hidden />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-card-border pt-6 sm:flex-row">
          <p className="text-sm text-muted">
            © {year} {siteConfig.name}. Tous droits réservés.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover"
          >
            <ArrowUp className="h-4 w-4" aria-hidden />
            Retour en haut
          </button>
        </div>
      </div>
    </footer>
  );
}
