import { Download, GitBranch, Github, Linkedin, Mail } from "lucide-react";
import { ContactForm } from "@/components/features/ContactForm";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description: `Contactez ${siteConfig.name} — formulaire, e-mail et réseaux professionnels.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section
      title="Me contacter"
      subtitle="Une question, une opportunité de stage ou un retour sur mon portfolio ?"
    >
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <h2 className="text-lg font-semibold text-foreground">
              Formulaire de contact
            </h2>
            <p className="mt-2 text-sm text-muted">
              Votre message m&apos;est envoyé directement par e-mail. Je vous
              réponds dès que possible.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Card>
        </div>

        <aside className="space-y-6 lg:col-span-2">
          <Card>
            <h2 className="font-semibold text-foreground">Coordonnées</h2>
            <ul className="mt-4 space-y-3 text-sm" role="list">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 text-muted hover:text-accent"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {siteConfig.email}
                </a>
              </li>
              {siteConfig.phone && (
                <li className="text-muted">{siteConfig.phone}</li>
              )}
              <li className="text-muted">{siteConfig.location}</li>
            </ul>
          </Card>

          <Card>
            <h2 className="font-semibold text-foreground">Réseaux</h2>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
              >
                <Github className="h-4 w-4" aria-hidden />
                GitHub — jejixx
              </a>
              <a
                href={siteConfig.social.gitea}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
              >
                <GitBranch className="h-4 w-4" aria-hidden />
                Gitea — Lycée Le Castel
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
                LinkedIn
              </a>
            </div>
          </Card>

          <Button href={siteConfig.cvPath} variant="secondary" className="w-full" download>
            <Download className="h-5 w-5" aria-hidden />
            Télécharger mon CV
          </Button>
        </aside>
      </div>
    </Section>
  );
}
