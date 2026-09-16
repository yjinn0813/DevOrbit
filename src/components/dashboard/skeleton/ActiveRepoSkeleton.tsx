/* Active Repository skeleton */

import { Card, CardContent } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

const ActiveRepoSkeleton = () => {
  return (
    <Card className="min-h-70 border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        <div className="flex items-baseline gap-2.5">
          <Skeleton className="h-9 w-64 max-[420px]:h-8 max-[420px]:w-48" />
        </div>

        <div className="mt-6 flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <Skeleton className="h-6 w-5 shrink-0 max-[420px]:h-5" />
                <Skeleton className="h-6 w-full max-w-56 max-[420px]:h-5 max-[420px]:w-40" />
              </div>

              <Skeleton className="h-6 w-10 shrink-0 max-[420px]:h-5 max-[420px]:w-8" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ActiveRepoSkeleton;