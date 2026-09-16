/* Contribution Streak skeleton */

import { Card, CardContent } from '../../../components/ui/card';
import { Skeleton } from '../../../components/ui/skeleton';

const StreakSkeleton = () => {
  return (
    <Card className="min-h-70 border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        {/* Title */}
        <div className="flex items-baseline gap-2.5">
          <Skeleton className="h-9 w-64 max-[420px]:h-8 max-[420px]:w-48" />
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-7">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-1.5"
            >
              {/* Label */}
              <Skeleton className="h-5 w-28 max-[420px]:h-4 max-[420px]:w-24" />

              {/* Value + Date */}
              <div className="flex flex-col items-center justify-center gap-0.5">
                <Skeleton className="h-8 w-16 max-[420px]:h-7 max-[420px]:w-14" />
                <Skeleton className="h-4 w-28 max-[420px]:w-24" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakSkeleton;