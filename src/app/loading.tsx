import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Container className="py-20">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="mt-4 h-6 w-full max-w-2xl" />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </Container>
  );
}
