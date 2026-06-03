import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-20", className)} aria-labelledby={title ? `${id}-title` : undefined}>
      <Container className={containerClassName}>
        {(title || subtitle) && (
          <header className="mb-10 max-w-2xl">
            {title && (
              <h2
                id={id ? `${id}-title` : undefined}
                className="text-2xl font-bold tracking-tight text-foreground md:text-3xl"
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-lg text-muted">{subtitle}</p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
