import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}

export function Card({ children, className, as: Component = "div" }: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-[var(--radius)] border border-card-border bg-card p-6 shadow-[var(--shadow)] transition-shadow hover:shadow-[var(--shadow-lg)]",
        className,
      )}
    >
      {children}
    </Component>
  );
}
