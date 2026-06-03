import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-bold text-foreground">
        Page introuvable
      </h1>
      <p className="mt-2 max-w-md text-muted">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Button href="/" className="mt-8">
        Retour à l&apos;accueil
      </Button>
    </Container>
  );
}
