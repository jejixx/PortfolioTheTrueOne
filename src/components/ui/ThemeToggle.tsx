"use client";

import { Moon, Sun } from "lucide-react";
import { useTransition } from "react";
import { setThemeAction } from "@/app/actions/theme";
import type { Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  initialTheme: Theme;
  className?: string;
}

export function ThemeToggle({ initialTheme, className }: ThemeToggleProps) {
  const [isPending, startTransition] = useTransition();
  const isDark = initialTheme === "dark";

  function toggle() {
    const next: Theme = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    startTransition(async () => {
      await setThemeAction(next);
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius)] border border-card-border bg-card text-foreground transition-colors hover:bg-muted-bg",
        className,
      )}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
    >
      {isDark ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
    </button>
  );
}
