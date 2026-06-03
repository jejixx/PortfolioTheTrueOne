import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { getAvailableGallery, getStageBySlug, getStageHeroImage, stages } from "@/data/stages";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";
import { formatDateRange } from "@/lib/utils";

interface StageDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return stages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: StageDetailPageProps) {
  const { slug } = await params;
  const stage = getStageBySlug(slug);
  if (!stage) return {};
  return createPageMetadata({
    title: `Stage — ${stage.company}`,
    description: stage.shortDescription,
    path: `/stages/${slug}`,
    image: stage.image ? `${siteConfig.url}${stage.image}` : undefined,
  });
}

export default async function StageDetailPage({ params }: StageDetailPageProps) {
  const { slug } = await params;
  const stage = getStageBySlug(slug);
  if (!stage) notFound();

  const heroImage = getStageHeroImage(stage);
  const gallery = getAvailableGallery(stage);

  return (
    <article>
      <Container className="py-12 md:py-16">
        <Link
          href="/stages"
          className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Retour aux stages
        </Link>

        <header className="mt-6 max-w-3xl">
          <Badge variant="accent">{stage.duration}</Badge>
          <h1 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
            {stage.company}
          </h1>
          <p className="mt-2 text-xl text-accent">{stage.position}</p>
          <p className="mt-2 text-muted">
            {stage.location} ·{" "}
            {formatDateRange(stage.startDate, stage.endDate)}
          </p>
          {stage.reportUrl && (
            <Button
              href={stage.reportUrl}
              variant="secondary"
              size="sm"
              className="mt-6"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
              Voir le rapport complet (Google Sites)
            </Button>
          )}
        </header>

        {heroImage && (
          <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-[var(--radius)] border border-card-border bg-muted-bg">
            <Image
              src={heroImage}
              alt={stage.imageAlt ?? stage.company}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain bg-white p-8"
              priority
            />
          </div>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <section>
              <h2 className="text-xl font-semibold text-foreground">
                Contexte de l&apos;entreprise
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                {stage.companyContext}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                Missions réalisées
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted" role="list">
                {stage.missions.map((mission) => (
                  <li key={mission}>{mission}</li>
                ))}
              </ul>
            </section>

            {stage.deliverables && stage.deliverables.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-foreground">
                  Livrables
                </h2>
                <ul className="mt-4 space-y-4" role="list">
                  {stage.deliverables.map((d) => (
                    <li
                      key={d.title}
                      className="rounded-[var(--radius)] border border-card-border bg-card p-4"
                    >
                      <h3 className="font-medium text-foreground">{d.title}</h3>
                      <p className="mt-1 text-sm text-muted">{d.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {gallery.length > 0 ? (
              <section>
                <h2 className="text-xl font-semibold text-foreground">
                  Illustrations du rapport
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2" role="list">
                  {gallery.map((item) => (
                    <li
                      key={item.src}
                      className="overflow-hidden rounded-[var(--radius)] border border-card-border bg-card"
                    >
                      <div className="relative aspect-[4/3] bg-white">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain p-4"
                          loading="lazy"
                        />
                      </div>
                      <p className="p-3 text-xs text-muted">{item.alt}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : stage.reportUrl ? (
              <section className="rounded-[var(--radius)] border border-card-border bg-accent-muted/30 p-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Illustrations & rapport détaillé
                </h2>
                <p className="mt-3 text-muted">
                  Les visuels du stage (Groupe UP, Kalidea, déroulement de la
                  semaine) sont disponibles sur mon rapport Google Sites, avec
                  les captures et le compte rendu complet.
                </p>
                <Button href={stage.reportUrl} variant="primary" className="mt-5">
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  Ouvrir le rapport illustré
                </Button>
              </section>
            ) : null}

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                Bilan & retour d&apos;expérience
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{stage.bilan}</p>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="rounded-[var(--radius)] border border-card-border bg-card p-6">
              <h2 className="font-semibold text-foreground">Technologies</h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {stage.technologies.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>

            <div className="rounded-[var(--radius)] border border-card-border bg-card p-6">
              <h2 className="font-semibold text-foreground">
                Compétences du référentiel
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted" role="list">
                {stage.competences.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

            {stage.reportUrl && (
              <Button href={stage.reportUrl} variant="outline" className="w-full">
                <ExternalLink className="h-4 w-4" aria-hidden />
                Rapport Google Sites
              </Button>
            )}

            <Button href="/contact" variant="outline" className="w-full">
              Me contacter
            </Button>
          </aside>
        </div>
      </Container>
    </article>
  );
}
