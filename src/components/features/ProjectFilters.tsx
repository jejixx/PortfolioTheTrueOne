"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import type { Project, ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectFiltersProps {
  projects: Project[];
  technologies: string[];
}

type CategoryFilter = "all" | ProjectCategory;

export function ProjectFilters({ projects, technologies }: ProjectFiltersProps) {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [tech, setTech] = useState<string>("all");

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchCategory =
        category === "all" || project.category === category;
      const matchTech =
        tech === "all" || project.technologies.includes(tech);
      return matchCategory && matchTech;
    });
  }, [projects, category, tech]);

  return (
    <div>
      <div
        className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        role="search"
        aria-label="Filtrer les projets"
      >
        <fieldset className="min-w-0">
          <legend className="mb-2 text-sm font-semibold text-foreground">
            Catégorie
          </legend>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Catégorie">
            {(
              [
                ["all", "Tous"],
                ["bts", "Projets BTS"],
                ["personal", "Projets personnels"],
              ] as const
            ).map(([value, label]) => (
              <FilterButton
                key={value}
                pressed={category === value}
                onClick={() => setCategory(value)}
              >
                {label}
              </FilterButton>
            ))}
          </div>
        </fieldset>

        <div className="min-w-[200px] lg:max-w-xs lg:flex-1">
          <label htmlFor="tech-filter" className="mb-2 block text-sm font-semibold text-foreground">
            Technologie
          </label>
          <select
            id="tech-filter"
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            className="h-11 w-full rounded-[var(--radius)] border border-card-border bg-card px-3 text-sm text-foreground"
          >
            <option value="all">Toutes les technologies</option>
            {technologies.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mb-6 text-sm text-muted" aria-live="polite">
        {filtered.length} projet{filtered.length !== 1 ? "s" : ""} affiché
        {filtered.length !== 1 ? "s" : ""}
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-[var(--radius)] border border-dashed border-card-border bg-muted-bg p-8 text-center text-muted">
          Aucun projet ne correspond à ces filtres.
        </p>
      ) : (
        <ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {filtered.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterButton({
  children,
  pressed,
  onClick,
}: {
  children: React.ReactNode;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "rounded-[var(--radius)] border px-4 py-2 text-sm font-medium transition-colors",
        pressed
          ? "border-accent bg-accent text-white"
          : "border-card-border bg-card text-foreground hover:bg-muted-bg",
      )}
    >
      {children}
    </button>
  );
}
