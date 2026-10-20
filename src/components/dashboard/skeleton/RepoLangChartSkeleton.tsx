
import { Card, CardContent } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

const RepoLangChartSkeleton = () => {
  return (
    <Card
      className="border border-secondary/50 bg-foreground dark:bg-card"
      aria-busy="true"
      aria-label="Loading repository language distribution"
    >
      <CardContent className="flex flex-col">
        {/* Title and tooltip */}
        <div className="flex items-baseline gap-2.5">
          <Skeleton className="h-9 w-64 max-w-[80%] rounded-md max-[420px]:h-8" />
          <Skeleton className="size-5 shrink-0 rounded-full" />
        </div>

        {/* Repository selector */}
        <div className="mt-6 flex w-full flex-col gap-6">
          <Skeleton className="h-10 w-50 rounded-md" />

          {/* Chart and legend */}
          <div className="flex w-full flex-col items-center gap-6 md:flex-row md:gap-10">
            {/* Bar chart */}
            <div className="h-64 w-full min-w-0 md:h-80 md:flex-3">
              <div className="flex h-full flex-col justify-around gap-3 py-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex h-6 w-full items-center gap-3"
                  >
                    <Skeleton className="h-4 w-12 shrink-0 rounded-sm" />
                    <Skeleton
                      className="h-5 rounded-sm"
                      style={{
                        width: `${90 - index * 11}%`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="grid w-full grid-cols-1 gap-y-3 min-[481px]:grid-cols-2 min-[481px]:gap-x-12 md:flex-2 md:grid-cols-1">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2"
                >
                  <Skeleton className="size-3 shrink-0 rounded-full" />
                  <Skeleton
                    className="h-4 rounded-sm"
                    style={{
                      width: `${55 + (index % 3) * 15}px`,
                    }}
                  />
                  <Skeleton className="ml-auto h-4 w-12 rounded-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RepoLangChartSkeleton;