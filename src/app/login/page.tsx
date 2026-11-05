import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Espace privé. Connexion requise.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Connexion | Espace privé",
    description: "Espace privé. Connexion requise.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Connexion | Espace privé",
    description: "Espace privé. Connexion requise.",
  },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <section className="w-full max-w-md rounded-xl border border-card-border bg-card p-6 shadow-lg sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          Portfolio privé
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          Connexion
        </h1>
        <p className="mt-3 text-sm text-muted">
          Connectez-vous pour accéder au portfolio.
        </p>
        <LoginForm />
      </section>
    </main>
  );
}
