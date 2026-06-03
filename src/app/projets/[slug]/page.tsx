import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { getProjectBySlug, projects } from "@/data/projects";
import { creativeWorkJsonLd, createPageMetadata } from "@/lib/seo";
import { getProjectCategoryLabel } from "@/lib/utils";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return createPageMetadata({
    title: project.title,
    description: project.shortDescription,
    path: `/projets/${slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(creativeWorkJsonLd(project)),
        }}
      />

      <Container className="py-12 md:py-16">
        <Link
          href="/projets"
          className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Retour aux projets
        </Link>

        <header className="mt-6 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={project.category === "bts" ? "accent" : "outline"}>
              {getProjectCategoryLabel(project.category)}
            </Badge>
            <span className="text-sm text-muted">{project.year}</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-muted">{project.shortDescription}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.githubUrl && (
              <Button href={project.githubUrl} variant="outline" size="sm">
                <Github className="h-4 w-4" aria-hidden />
                GitHub
              </Button>
            )}
            {project.giteaUrl && (
              <Button href={project.giteaUrl} variant="outline" size="sm">
                <ExternalLink className="h-4 w-4" aria-hidden />
                Gitea (lycée)
              </Button>
            )}
            {project.demoUrl && (
              <Button href={project.demoUrl} variant="primary" size="sm">
                <ExternalLink className="h-4 w-4" aria-hidden />
                Démo live
              </Button>
            )}
          </div>
        </header>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[var(--radius)] border border-card-border bg-muted-bg">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            {[
              { title: "Contexte & objectif", content: project.context },
              { title: "Problématique", content: project.problem },
              { title: "Solution technique", content: project.solution },
            ].map((block) => (
              <section key={block.title}>
                <h2 className="text-xl font-semibold text-foreground">
                  {block.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">{block.content}</p>
              </section>
            ))}

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                Ce que j&apos;ai appris
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted" role="list">
                {project.learnings.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="rounded-[var(--radius)] border border-card-border bg-card p-6">
              <h2 className="font-semibold text-foreground">Stack détaillée</h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>

            <div className="rounded-[var(--radius)] border border-card-border bg-card p-6">
              <h2 className="font-semibold text-foreground">
                Compétences du référentiel
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted" role="list">
                {project.competences.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
