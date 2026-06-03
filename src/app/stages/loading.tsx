import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function StagesLoading() {
  return (
    <Container className="py-20">
      <Skeleton className="h-10 w-40" />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
    </Container>
  );
}
