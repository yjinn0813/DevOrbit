/* 레포별 잔디 컴포넌트 스켈레톤 */

import { Card, CardContent } from '../../ui/card';
import { Skeleton } from '../../ui/skeleton';

const ReposRecordSkeleton = () => {
  return (
    <Card className="border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        {/* title */}
        <div className="flex items-baseline gap-2.5">
          <Skeleton className="h-9 w-64 max-[420px]:h-8 max-[420px]:w-52" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>

        <div className="mt-6">
          {/* tabs */}
          <div className="flex h-auto gap-1 rounded-lg bg-muted p-2">
            <Skeleton className="h-10 flex-1 rounded-md" />
            <Skeleton className="h-10 flex-1 rounded-md" />
            <Skeleton className="h-10 flex-1 rounded-md" />
          </div>

          {/* heatmap */}
          <div className="mt-3 overflow-hidden py-4">
            <div className="flex flex-col gap-1">
              {/* month labels */}
              <div className="ml-10 flex justify-between pr-1">
                {Array.from({ length: 12 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-3 w-6"
                  />
                ))}
              </div>

              {/* heatmap blocks */}
              <div className="flex gap-1">
                {/* weekday labels */}
                <div className="flex w-8 flex-col justify-between py-1">
                  <Skeleton className="h-3 w-6" />
                  <Skeleton className="h-3 w-6" />
                  <Skeleton className="h-3 w-6" />
                </div>

                {/* weeks */}
                <div className="flex flex-1 gap-1 overflow-hidden">
                  {Array.from({ length: 53 }).map(
                    (_, weekIndex) => (
                      <div
                        key={weekIndex}
                        className="flex flex-1 flex-col gap-1"
                      >
                        {Array.from({ length: 7 }).map(
                          (_, dayIndex) => (
                            <Skeleton
                              key={dayIndex}
                              className="aspect-square w-full rounded-xs"
                            />
                          ),
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* legend */}
            <div className="mt-3 flex items-center justify-end gap-2">
              <Skeleton className="h-3 w-8" />

              {Array.from({ length: 5 }).map(
                (_, index) => (
                  <Skeleton
                    key={index}
                    className="size-3 rounded-xs"
                  />
                ),
              )}

              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReposRecordSkeleton;