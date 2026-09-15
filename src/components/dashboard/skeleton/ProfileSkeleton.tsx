import { Card, CardContent } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <Card className="border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-row items-center">
        <Skeleton className="size-32 shrink-0 rounded-full max-[420px]:size-20" />

        <div className="ml-6 flex flex-col gap-2 max-[420px]:ml-4">
          <Skeleton className="h-9 w-40 max-[420px]:h-6 max-[420px]:w-28" />
          <Skeleton className="h-6 w-28 max-[420px]:h-5 max-[420px]:w-20" />
          <Skeleton className="h-4 w-36 max-[420px]:h-3 max-[420px]:w-28" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSkeleton;