/* Active Repository skeleton */

import { Card, CardContent } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

const ActiveRepoSkeleton = () => {
  return (
    <Card className="border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        <div className="flex items-baseline gap-2.5">
          <Skeleton className="h-9 w-64 max-[420px]:h-8 max-[420px]:w-48" />
          <Skeleton className="size-4 rounded-full" />
        </div>

        <div className="mt-6 flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex justify-between"
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-5" />
                <Skeleton className="h-6 w-32 max-[420px]:h-5 max-[420px]:w-24" />
              </div>

              <Skeleton className="h-6 w-8 max-[420px]:h-5 max-[420px]:w-6" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ActiveRepoSkeleton;