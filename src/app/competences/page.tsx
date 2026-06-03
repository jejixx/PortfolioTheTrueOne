import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import {
  blocLabels,
  getCompetencesByBloc,
  getRelevantBlocs,
  getSecondaryBlocs,
} from "@/data/competences";
import type { CompetenceBloc } from "@/types";
import { createPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = createPageMetadata({
  title: "Compétences",
  description: `Compétences techniques et référentiel BTS SIO (option ${siteConfig.option}) de ${siteConfig.name}.`,
  path: "/competences",
});

export default function CompetencesPage() {
  const primaryBlocs = getRelevantBlocs();
  const secondaryBlocs = getSecondaryBlocs();

  return (
    <>
      <Section
        title="Compétences & référentiel BTS SIO"
        subtitle={`Option ${siteConfig.option} — cartographie des compétences officielles et du niveau de maîtrise estimé.`}
      >
        <p className="max-w-3xl text-muted">
          Les niveaux indiqués sont une auto-évaluation honnête, consolidée par
          les projets, stages et évaluations. Modifiez l&apos;option dans{" "}
          <code className="rounded bg-muted-bg px-1 text-sm">
            src/config/site.ts
          </code>{" "}
          pour adapter l&apos;affichage SLAM / SISR.
        </p>
      </Section>

      {primaryBlocs.map((bloc) => (
        <BlocSection key={bloc} bloc={bloc} highlight />
      ))}

      {secondaryBlocs.length > 0 && (
        <Section
          title="Notions transverses"
          subtitle="Compétences du référentiel hors option principale — niveau introductif."
          className="bg-muted-bg/50"
        >
          {secondaryBlocs.map((bloc) => (
            <BlocSection key={bloc} bloc={bloc} />
          ))}
        </Section>
      )}
    </>
  );
}

function BlocSection({
  bloc,
  highlight = false,
}: {
  bloc: CompetenceBloc;
  highlight?: boolean;
}) {
  const items = getCompetencesByBloc(bloc);
  if (items.length === 0) return null;

  return (
    <Section
      title={blocLabels[bloc]}
      className={highlight ? undefined : "pt-0"}
    >
      <ul className="grid gap-6 md:grid-cols-2" role="list">
        {items.map((comp) => (
          <li
            key={comp.id}
            className={cn(
              "rounded-[var(--radius)] border border-card-border bg-card p-6 shadow-[var(--shadow)]",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge variant="accent">{comp.code}</Badge>
                <h3 className="mt-2 font-semibold text-foreground">
                  {comp.label}
                </h3>
              </div>
              <span className="text-sm font-medium text-muted" aria-hidden>
                {comp.level}%
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">{comp.description}</p>
            <div
              className="mt-4 h-2 overflow-hidden rounded-full bg-muted-bg"
              role="meter"
              aria-valuenow={comp.level}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${comp.label} : ${comp.level}%`}
            >
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${comp.level}%` }}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {comp.relatedSkills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
