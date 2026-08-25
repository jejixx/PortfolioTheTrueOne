import { StageCard } from "@/components/cards/StageCard";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { stages } from "@/data/stages";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Stages",
  description: `Stages et alternances de ${siteConfig.name} — missions, technologies et compétences BTS SIO.`,
  path: "/stages",
});

export default function StagesPage() {
  return (
    <Section
      title="Mes stages"
      subtitle="Deux expériences concrètes en entreprise, avec progression du stage d'observation à un projet professionnel de développement logiciel, de la conception à la validation technique."
    >
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-[var(--radius)] border border-card-border bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            Expériences
          </p>
          <p className="mt-2 text-lg font-semibold text-foreground">2 stages</p>
        </div>
        <div className="rounded-[var(--radius)] border border-card-border bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            Périmètre
          </p>
          <p className="mt-2 text-lg font-semibold text-foreground">Web + desktop</p>
        </div>
        <div className="rounded-[var(--radius)] border border-card-border bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            Focalisation
          </p>
          <p className="mt-2 text-lg font-semibold text-foreground">API & architecture</p>
        </div>
      </div>

      <ul className="grid gap-6 lg:grid-cols-2" role="list">
        {stages.map((stage) => (
          <li key={stage.slug}>
            <StageCard stage={stage} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
