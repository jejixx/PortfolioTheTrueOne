import type { EducationItem } from "@/types";

interface TimelineProps {
  items: EducationItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="relative space-y-8 border-l-2 border-card-border pl-6">
      {items.map((item) => (
        <li key={item.title} className="relative">
          <span
            className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-card"
            aria-hidden
          />
          <time className="text-sm font-medium text-accent">{item.period}</time>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {item.title}
          </h3>
          <p className="text-sm font-medium text-muted">{item.institution}</p>
          {item.description && (
            <p className="mt-2 text-sm text-muted">{item.description}</p>
          )}
        </li>
      ))}
    </ol>
  );
}
