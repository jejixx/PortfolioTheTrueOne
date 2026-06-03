import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border border-card-border bg-muted-bg px-2 py-1 text-xs font-medium text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
