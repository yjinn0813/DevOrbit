import { Card, CardContent } from '../../ui/card';
import { Skeleton } from '../../ui/skeleton';

const LanguageSkeleton = () => {
  return (
    <Card className="border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        {/* Title */}
        <div className="flex items-baseline gap-2.5">
          <Skeleton className="h-9 w-48 max-[420px]:h-8 max-[420px]:w-40" />
        </div>

        {/* Chart + Legend */}
        <div className="mt-6 flex flex-row items-center justify-center gap-10">
          {/* Chart */}
          <div className="h-80 w-full md:w-[55%]">
            <div className="flex h-full flex-col justify-around">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-5 rounded-md"
                  style={{ width: `${85 - index * 8}%` }}
                />
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <Skeleton className="size-3 rounded-full" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguageSkeleton;