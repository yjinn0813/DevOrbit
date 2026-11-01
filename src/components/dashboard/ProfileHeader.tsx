/* Detail page - profile card */

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Card, CardContent } from '../ui/card';
import { CiShare1 } from "react-icons/ci";
import SharePopover from '../common/SharePopover';
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
  
  // ====================
  return (
    <Card className="border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-row justify-between relative">
        {/* Profile Info */}
        <a href={`https://github.com/${user.login}`}
          target="_blank"
          rel="noopener noreferrer"
          className='cursor-pointer flex flex-row items-center'
        >
          <img
            src={user.avatarUrl}
            alt={user.login}
            className="size-32 rounded-full object-cover max-[420px]:size-20"
          />

          <div className="ml-6 max-[420px]:ml-4">
            <p className="text-3xl font-bold text-background dark:text-foreground max-[420px]:text-2xl">
              {user.name}
            </p>

            <p className="my-1.5 text-lg text-muted-foreground max-[420px]:my-1 max-[420px]:text-sm">
              @{user.login}
            </p>

            <p className="text-sm text-muted-foreground max-[420px]:text-xs">
              On GitHub for {joinedDays} days
            </p>
          </div>
        </a>

        {/* Share Button */}
        <Popover>
          <PopoverTrigger 
            className="absolute right-6 top-3 flex size-10 items-center justify-center rounded-full 
              border border-secondary/50 bg-secondary/90 hover:bg-secondary/70
              dark:border-none dark:bg-muted dark:hover:bg-muted/80"
            aria-label="Share profile"
          >
            <CiShare1 className="h-5 w-5 cursor-pointer text-foreground" />
          </PopoverTrigger>

          <PopoverContent className="w-72 max-w-[320px] p-4 border border-secondary/50 bg-foreground dark:bg-card"
            align="end"
            sideOffset={8}
          >
            <SharePopover />
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  )
}

export default ProfileHeader;