import { ArrowRight, Building2, MapPin } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import type { Stage } from "@/types";
import { formatDateRange } from "@/lib/utils";

interface StageCardProps {
  stage: Stage;
}

export function StageCard({ stage }: StageCardProps) {
  return (
    <Card as="article" className="flex h-full flex-col">
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius)] bg-accent-muted text-accent">
          <Building2 className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            <Link
              href={`/stages/${stage.slug}`}
              className="hover:text-accent"
            >
              {stage.company}
            </Link>
          </h3>
          <p className="text-sm font-medium text-accent">{stage.position}</p>
        </div>
      </div>

      <p className="flex items-center gap-1 text-sm text-muted">
        <MapPin className="h-4 w-4 shrink-0" aria-hidden />
        {stage.location}
      </p>
      <p className="mt-1 text-sm text-muted">
        {formatDateRange(stage.startDate, stage.endDate)} · {stage.duration}
      </p>
      <p className="mt-3 flex-1 text-sm text-muted">{stage.shortDescription}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {stage.technologies.slice(0, 5).map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>

      <Link
        href={`/stages/${stage.slug}`}
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
      >
        Lire le détail du stage
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </Card>
  );
}
