import { Card, CardContent } from '../../ui/card';
import { Skeleton } from '../../ui/skeleton';

const YearlyTrendSkeleton = () => {
  return (
    <Card className="border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        <div className="flex items-baseline gap-2.5">
          <Skeleton className="h-9 w-52 max-[420px]:h-8 max-[420px]:w-40" />
        </div>

        <div className="mt-6 flex flex-row items-center justify-center gap-10">
          <div className="mt-6 h-64 w-full md:h-80">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default YearlyTrendSkeleton;