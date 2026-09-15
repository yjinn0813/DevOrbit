import { Card, CardContent } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

const ActivitySkeleton = () => {
  return (
    <Card className="border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        <Skeleton className="h-9 w-56 max-[420px]:h-7 max-[420px]:w-40" />

        <div className="mt-6 grid grid-cols-2 gap-7 lg:flex lg:flex-row lg:items-center lg:justify-around">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-1.5"
            >
              <Skeleton className="h-5 w-20 max-[420px]:h-4 max-[420px]:w-16" />
              <Skeleton className="h-8 w-12 max-[420px]:h-7 max-[420px]:w-10" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivitySkeleton;