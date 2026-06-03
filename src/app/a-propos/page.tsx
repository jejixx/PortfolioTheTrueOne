import { Download, ExternalLink } from "lucide-react";
import {
  bioLong,
  education,
  interests,
  languages,
  professionalExperiences,
  softSkills,
  veilleItems,
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
        <ul className="grid gap-6 md:grid-cols-2" role="list">
          {veilleItems.map((item) => (
            <li key={item.title}>
              <Card as="article">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-accent">
                  {item.source}
                </p>
                <p className="mt-3 text-sm text-muted">{item.description}</p>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
                  >
                    Consulter
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                )}
              </Card>
            </li>
          ))}
        </ul>
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
