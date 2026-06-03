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
      subtitle="Stage d'observation Up | Kalidea (3ème D) — le stage BTS en entreprise sera ajouté prochainement."
    >
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
