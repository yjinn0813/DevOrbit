/* Detail page - commit, pr, issue, total */

import { Card, CardContent } from '../ui/card';
import { GitCommit, GitPullRequest, CircleDot, Activity } from 'lucide-react';
import type { GithubUser } from '../../../types/GithubUser';
import InfoTooltip from '../common/InfoTooltip';

interface ActivityProps {
  user: GithubUser;
}

// ====================
const ActivityStats = ({ user }: ActivityProps) => {
  return (
    <Card className="border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        <div className='flex gap-2.5 items-baseline'>
          <div className='text-3xl font-bold text-background dark:text-foreground max-[420px]:text-2xl'>
            Activity Overview
          </div>
          <InfoTooltip content='Contribution data from the past year (including commits, pull requests, issues, and total contributions)'/>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-7 lg:flex lg:flex-row lg:items-center lg:justify-around">
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground max-[420px]:text-xs">
              <GitCommit className="size-4" />
              <p>Commits</p>
            </div>
            <p className="text-2xl font-semibold text-primary max-[420px]:text-xl">
              {user.contributionsCollection.totalCommitContributions}
            </p>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground max-[420px]:text-xs">
              <GitPullRequest className="size-4" />
              <p>PR</p>
            </div>
            <p className="text-2xl font-semibold text-primary max-[420px]:text-xl">
              {user.contributionsCollection.totalPullRequestContributions}
            </p>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground max-[420px]:text-xs">
              <CircleDot className="size-4" />
              <p>Issues</p>
            </div>
            <p className="text-2xl font-semibold text-primary max-[420px]:text-xl">
              {user.contributionsCollection.totalIssueContributions}
            </p>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground max-[420px]:text-xs">
              <Activity className="size-4" />
              <p>Total</p>
            </div>
            <p className="text-2xl font-semibold text-secondary max-[420px]:text-xl">
              {user.contributionsCollection.contributionCalendar.totalContributions}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ActivityStats;