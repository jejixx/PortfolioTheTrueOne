"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="text-2xl font-bold text-foreground">
        Une erreur est survenue
      </h1>
      <p className="mt-2 max-w-md text-muted">
        Désolé, le chargement de cette page a échoué. Vous pouvez réessayer.
      </p>
      <div className="mt-8 flex gap-3">
        <Button type="button" onClick={reset}>
          Réessayer
        </Button>
        <Button href="/" variant="outline">
          Accueil
        </Button>
      </div>
    </Container>
  );
}
