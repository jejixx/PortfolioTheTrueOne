import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/types";
import { getProjectCategoryLabel } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card as="article" className="flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-[16/10] w-full bg-muted-bg">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant={project.category === "bts" ? "accent" : "outline"}>
            {getProjectCategoryLabel(project.category)}
          </Badge>
          <span className="text-xs text-muted">{project.year}</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          <Link
            href={`/projets/${project.slug}`}
            className="hover:text-accent focus-visible:rounded-sm"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted">
          {project.shortDescription}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        <Link
          href={`/projets/${project.slug}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
        >
          Voir le projet
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </Card>
  );
}
