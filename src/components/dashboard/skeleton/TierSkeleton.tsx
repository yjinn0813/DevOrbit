/* Tier badge skeleton */

import { Card, CardContent } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

export default function TierSkeleton() {
  return (
    <Card className="max-h-46 border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        {/* Title */}
        <div className="flex items-baseline gap-2.5">
          <Skeleton className="h-9 w-16 max-[420px]:h-7 max-[420px]:w-14" />
        </div>

        {/* Tier */}
        <div className="mt-6 flex flex-row items-center justify-evenly gap-4">
          {/* Badge */}
          <Skeleton className="h-20 w-24" />

          {/* Score */}
          <Skeleton className="h-7 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}
