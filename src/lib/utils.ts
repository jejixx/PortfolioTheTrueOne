import type { ProjectCategory } from "@/types";

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDateRange(start: string, end: string): string {
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  });
  return `${formatter.format(new Date(start))} — ${formatter.format(new Date(end))}`;
}

export function getProjectCategoryLabel(category: ProjectCategory): string {
  return category === "bts" ? "Projet BTS" : "Projet personnel";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
