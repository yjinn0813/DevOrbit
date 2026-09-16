/* Contribution Streak */

import { Card, CardContent } from '../ui/card';
import { Flame, Trophy, CalendarDays, GitCommit } from "lucide-react";
import type { GithubUser } from '../../../types/GithubUser';
import InfoTooltip from '../common/InfoTooltip';
import { formatDateRange, formatDate } from '../../utils/formatDateRange'

interface ContributionProps {
  user: GithubUser;
}

// ====================
const ContributionStreak = ({ user }: ContributionProps) => {
  const createdDate = user.createdAt.slice(0, 10);

  const currentStart = user.contributionsCollection.currentStreak.startDate;
  const currentEnd = user.contributionsCollection.currentStreak.endDate;
  const longestStart = user.contributionsCollection.longestStreak.startDate;
  const longestEnd = user.contributionsCollection.longestStreak.endDate;

  // ====================
  return (
    <Card className="min-h-70 border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        <div className='flex gap-2.5 items-baseline'>
          <div className='text-3xl font-bold text-background dark:text-foreground max-[420px]:text-2xl'>
            Contribution Streak
          </div>
          <InfoTooltip content='Contribution activity and streak statistics based on GitHub contribution data'/>
        </div>
        
        <div className='mt-6 grid grid-cols-2 gap-7'>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground max-[420px]:text-xs">
              <Flame className="size-4" />
              <p>Current Streak</p>
            </div>
            <div className='flex flex-col items-center justify-center gap-0.5'>
              <p className="text-2xl font-semibold text-primary max-[420px]:text-xl">
                {user.contributionsCollection.currentStreak.count}
              </p>
              {currentStart && currentEnd && (
                <p className="text-xs font-light text-muted-foreground">
                  {formatDateRange(currentStart, currentEnd)}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground max-[420px]:text-xs">
              <CalendarDays className="size-4" />
              <p>Active Days</p>
            </div>
            <p className="text-2xl font-semibold text-primary max-[420px]:text-xl">
              {user.contributionsCollection.activeDays}
            </p>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground max-[420px]:text-xs">
              <Trophy className="size-4" />
              <p>Longest Streak</p>
            </div>
            <div className='flex flex-col items-center justify-center gap-0.5'>
              <p className="text-2xl font-semibold text-primary max-[420px]:text-xl">
                {user.contributionsCollection.longestStreak.count}
              </p>
              <p className='text-xs font-light text-muted-foreground'>
                {formatDateRange(longestStart, longestEnd)}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground max-[420px]:text-xs">
              <GitCommit className="size-4" />
              <p>Total Contributions</p>
            </div>
            <div className='flex flex-col items-center justify-center gap-0.5'>
              <div className="text-2xl font-semibold text-secondary max-[420px]:text-xl">
                {user.contributionsCollection.totalContributions}
              </div>
              <p className='text-xs font-light text-muted-foreground'>
                {formatDate(createdDate)} ~ present
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card> 
  )
}

export default ContributionStreak;