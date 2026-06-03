import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProjectsLoading() {
  return (
    <Container className="py-20">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="mt-8 h-12 w-full max-w-xl" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-80" />
        ))}
      </div>
    </Container>
  );
}
