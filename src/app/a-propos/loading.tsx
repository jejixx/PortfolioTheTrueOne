import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AboutLoading() {
  return (
    <Container className="py-20">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="mt-6 h-32 w-full max-w-3xl" />
    </Container>
  );
}
