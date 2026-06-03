import { ProjectFilters } from "@/components/features/ProjectFilters";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { getAllTechnologies, projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Projets",
  description: `Projets BTS et personnels de ${siteConfig.name} — filtres par catégorie et technologie.`,
  path: "/projets",
});

export default function ProjectsPage() {
  const technologies = getAllTechnologies();

  return (
    <Section
      title="Mes projets"
      subtitle="Projets BTS et personnels — filtrez par catégorie ou technologie."
    >
      <ProjectFilters projects={projects} technologies={technologies} />
    </Section>
  );
}
