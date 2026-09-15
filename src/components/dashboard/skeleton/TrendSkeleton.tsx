/* Contribution Trend skeleton */

import { Card, CardContent } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

const TrendSkeleton = () => {
  return (
    <Card className="border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        {/* Title */}
        <div className="flex items-baseline gap-2.5">
          <Skeleton className="h-9 w-64 max-[420px]:h-8 max-[420px]:w-48" />
          <Skeleton className="size-4 rounded-full" />
        </div>

        {/* Chart */}
        <div className="mt-6 flex flex-row items-center justify-center gap-10">
          <Skeleton className="h-80 w-full rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
}

export default TrendSkeleton;