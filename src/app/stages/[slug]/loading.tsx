import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function StageDetailLoading() {
  return (
    <Container className="py-16">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="mt-6 h-12 w-2/3" />
      <Skeleton className="mt-10 h-48 w-full" />
    </Container>
  );
}
