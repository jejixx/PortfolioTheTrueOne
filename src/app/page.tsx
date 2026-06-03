import { Download, Mail, FolderKanban } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerItem, StaggerList } from "@/components/motion/StaggerList";
import { SkillBars } from "@/components/features/SkillBars";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { bioLong } from "@/data/about";
import { getFeaturedProjects } from "@/data/projects";
import { homeStats, skillCategories } from "@/data/skills";
import { createPageMetadata, personJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: `${siteConfig.name} — Portfolio BTS SIO`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />

      <section className="border-b border-card-border bg-gradient-to-b from-accent-muted/40 to-background py-20 md:py-28">
        <Container>
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Portfolio BTS SIO
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {siteConfig.name}
            </h1>
            <p className="mt-4 text-xl text-muted md:text-2xl">
              {siteConfig.title} — option{" "}
              <span className="font-semibold text-accent">
                {siteConfig.option}
              </span>
            </p>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              {siteConfig.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/projets" size="lg">
                <FolderKanban className="h-5 w-5" aria-hidden />
                Voir mes projets
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                <Mail className="h-5 w-5" aria-hidden />
                Me contacter
              </Button>
              <Button
                href={siteConfig.cvPath}
                variant="secondary"
                size="lg"
                download
              >
                <Download className="h-5 w-5" aria-hidden />
                Télécharger mon CV
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      <Section
        id="a-propos-teaser"
        title="À propos"
        subtitle="Un aperçu de mon parcours et de ma motivation."
      >
        <FadeIn>
          <p className="max-w-3xl text-lg leading-relaxed text-muted">
            {bioLong.split("\n\n")[0]}
          </p>
          <Link
            href="/a-propos"
            className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-hover"
          >
            En savoir plus →
          </Link>
        </FadeIn>
      </Section>

      <Section
        id="stats"
        title="En chiffres"
        className="bg-muted-bg/50"
      >
        <StaggerList className="grid gap-6 sm:grid-cols-3">
          {homeStats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="rounded-[var(--radius)] border border-card-border bg-card p-6 text-center shadow-[var(--shadow)]">
                <p className="text-3xl font-bold text-accent">{stat.value}</p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </Section>

      <Section
        id="projets"
        title="Projets à la une"
        subtitle="Une sélection de réalisations BTS et personnelles."
      >
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
          {featured.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <Button href="/projets" variant="outline">
            Voir tous les projets
          </Button>
        </div>
      </Section>

      <Section
        id="competences"
        title="Compétences"
        subtitle="Aperçu par domaine — détail sur la page Compétences."
        className="bg-muted-bg/50"
      >
        <div className="grid gap-10 lg:grid-cols-2">
          {skillCategories.map((group) => (
            <FadeIn key={group.id}>
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                {group.label}
              </h3>
              <SkillBars skills={group.skills} />
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
