"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "none";
  /** Contenu visible dès le chargement (hero) — évite opacity:0 si déjà dans le viewport */
  onMount?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  onMount = false,
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  const offset =
    direction === "up" ? 24 : direction === "down" ? -24 : 0;

  const visible = { opacity: 1, y: 0 };
  const transition = { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset }}
      {...(onMount
        ? { animate: visible, transition }
        : {
            whileInView: visible,
            viewport: { once: true, margin: "-50px" },
            transition,
          })}
    >
      {children}
    </motion.div>
  );
}
