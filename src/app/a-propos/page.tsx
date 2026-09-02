import { Download, ExternalLink } from "lucide-react";
import {
  bioLong,
  education,
  interests,
  languages,
  professionalExperiences,
  softSkills,
} from "@/data/about";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/motion/FadeIn";
import { Timeline } from "@/components/features/Timeline";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "À propos",
  description: `Découvrez le parcours, la veille technologique et le CV de ${siteConfig.name}.`,
  path: "/a-propos",
});

export default function AboutPage() {
  return (
    <>
      <Section
        title="À propos de moi"
        subtitle={`${siteConfig.title} — option ${siteConfig.option} · ${siteConfig.location}`}
      >
        <FadeIn>
          <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
            {bioLong.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section title="Parcours scolaire" className="bg-muted-bg/50">
        <Timeline items={education} />
      </Section>

      <Section title="Expériences professionnelles">
        <ul className="grid gap-6 md:grid-cols-2" role="list">
          {professionalExperiences.map((exp) => (
            <li key={exp.title}>
              <Card as="article">
                <p className="text-sm font-medium text-accent">{exp.period}</p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">
                  {exp.title}
                </h3>
                <p className="text-sm font-medium text-muted">
                  {exp.company} — {exp.location}
                </p>
                <p className="mt-3 text-sm text-muted">{exp.description}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Soft skills" className="bg-muted-bg/50">
        <ul className="flex flex-wrap gap-2" role="list">
          {softSkills.map((skill) => (
            <li key={skill}>
              <Badge variant="accent">{skill}</Badge>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Langues">
        <ul className="flex flex-wrap gap-3" role="list">
          {languages.map((lang) => (
            <li key={lang.name}>
              <Badge>
                {lang.name} — {lang.level}
              </Badge>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Centres d'intérêt" className="bg-muted-bg/50">
        <ul className="flex flex-wrap gap-2" role="list">
          {interests.map((interest) => (
            <li key={interest}>
              <Badge>{interest}</Badge>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="Veille technologique"
        subtitle="Comment je reste informé — essentiel pour le BTS SIO."
      >
        <FadeIn>
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-muted mb-8">
            <p>
              Pour rester à jour dans l'univers technologique, j'effectue une veille quotidienne. Chaque soir, je jette un coup d'œil à la section <strong>Veille</strong> de mon portfolio pour découvrir et lire les articles les plus pertinents et tendances du moment.
            </p>
            <p>
              <strong>Source principale :</strong> Je m'appuie sur <strong>Hacker News</strong>, une plateforme très reconnue dans l'écosystème tech, fondée par Y Combinator. Les articles y sont curatés par une communauté de développeurs et entrepreneurs de haut niveau, ce qui garantit la qualité du contenu.
            </p>
            <p>
              <strong>Avant :</strong> J'utilisais autrefois <strong>Feedly</strong> pour agréger plusieurs sources RSS. J'ai migré vers Hacker News directement via mon portfolio car c'est plus simple, plus pertinent et directement intégré à mon site.
            </p>
          </div>
        </FadeIn>

        <div className="mt-8 rounded-[var(--radius)] border border-card-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Accéder à ma veille</h3>
          <p className="text-sm text-muted mb-4">
            Retrouvez tous les articles de Hacker News directement sur mon portfolio :
          </p>
          <a
            href="/veille"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium"
          >
            Consulter la page Veille
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </Section>

      <Section title="Curriculum Vitae" className="bg-muted-bg/50">
        <Card>
          <p className="text-muted">
            Téléchargez mon CV au format PDF pour une présentation complète de
            mon parcours, mes compétences et mes expériences.
          </p>
          <Button href={siteConfig.cvPath} className="mt-6" download>
            <Download className="h-5 w-5" aria-hidden />
            Télécharger le CV (PDF)
          </Button>
        </Card>
      </Section>
    </>
  );
}
