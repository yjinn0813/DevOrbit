/* Detail page - repo, stars, contribute */

import { Card, CardContent } from '../ui/card';
import { FolderGit2, Star, GitFork, GitBranch } from 'lucide-react';
import type { GithubUser } from '../../types/GithubUser';
import InfoTooltip from '../common/InfoTooltip';

interface RepoProps {
  user: GithubUser;
}

// ====================
const RepoStats = ({ user }: RepoProps) => {
  const totalStars = user.repositories.nodes.reduce(
    (total, repo) => total + repo.stargazerCount,
    0,
  );

  const totalForks = user.repositories.nodes.reduce(
    (total, repo) => total + repo.forkCount,
    0,
  );

  return (
    <Card className="border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        <div className='flex gap-2.5 items-baseline'>
          <div className='text-3xl font-bold text-background dark:text-foreground max-[420px]:text-2xl'>
            Repositories
          </div>
          <InfoTooltip content='Statistics based on repositories currently owned by the user (including stars, forks, and contributions to other repositories)'/>
        </div>
        
        <div className='mt-6 grid grid-cols-2 gap-7 lg:flex lg:flex-row lg:items-center lg:justify-around'>
          <div className='flex flex-col items-center gap-1.5'>
            <div className="flex items-center gap-1.5 text-muted-foreground max-[420px]:text-xs">
              <FolderGit2 className="size-4" />
              <p>Repos</p>
            </div>
            <p className='text-2xl font-semibold text-primary max-[420px]:text-xl'>
              {user.repositories.totalCount}
            </p>
          </div>

          <div className='flex flex-col items-center gap-1.5'>
            <div className="flex items-center gap-1.5 text-muted-foreground max-[420px]:text-xs">
              <Star className="size-4" />
              <p>Stars</p>
            </div>
            <p className='text-2xl font-semibold text-primary max-[420px]:text-xl'>
              {totalStars}
            </p>
          </div>

          <div className='flex flex-col items-center gap-1.5'>
            <div className="flex items-center gap-1.5 text-muted-foreground max-[420px]:text-xs">
              <GitFork className="size-4" />
              <p>Forks</p>
            </div>
            <p className='text-2xl font-semibold text-primary max-[420px]:text-xl'>
              {totalForks}
            </p>
          </div>

          <div className='flex flex-col items-center gap-1.5'>
            <div className="flex items-center gap-1.5 text-muted-foreground max-[420px]:text-xs">
              <GitBranch className="size-4" />
              <p>Contributed</p>
            </div>
            <p className='text-2xl font-semibold text-primary max-[420px]:text-xl'>
              {user.contributionsCollection.totalRepositoriesWithContributedCommits}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RepoStats;