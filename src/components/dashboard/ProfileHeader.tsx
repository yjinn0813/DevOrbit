/* Detail page - profile card */

import { Card, CardContent } from '../ui/card';
import type { GithubUser } from '../../../types/GithubUser';

interface ProfileHeaderProps {
  user: GithubUser;
}

// ====================
const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const createdDate = new Date(user.createdAt); // 가입일자 조회
  const today = new Date();
  createdDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const joinedDays =
    Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  return (
    <Card className="min-h-46 border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-row items-center">
        <img
          src={user.avatarUrl}
          alt={user.login}
          className="size-32 rounded-full object-cover max-[420px]:size-20"
        />

        <div className="ml-6 max-[420px]:ml-4">
          <p className="text-3xl font-bold text-background dark:text-foreground max-[420px]:text-xl">
            {user.name}
          </p>

          <p className="my-1 text-lg text-muted-foreground max-[420px]:my-1 max-[420px]:text-sm">
            <a
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noreferrer"
            >
              @{user.login}
            </a>
          </p>

          <p className="text-sm text-muted-foreground max-[420px]:text-xs">
            On GitHub for {joinedDays} days
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileHeader;