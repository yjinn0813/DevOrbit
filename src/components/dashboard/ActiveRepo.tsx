/* Active Repository: 최근 1년 안에 가장 많이 (커밋+pr)한 레포 순위 */

import { Card, CardContent } from '../ui/card';
import type { GithubUser } from '../../types/GithubUser';
import InfoTooltip from '../common/InfoTooltip';

interface ActiveRepoProps {
  user: GithubUser;
}

const ActiveRepo = ({ user }: ActiveRepoProps) => {
  const commitRepos =
    user.contributionsCollection.commitContributionsByRepository;

  const prRepos =
    user.contributionsCollection.pullRequestContributionsByRepository;

  const repoActivity = new Map<string, number>();

  // 커밋 수 합산
  commitRepos.forEach(({ repository, contributions }) => {
    const commitCount = contributions.nodes.reduce(
      (total, { commitCount }) => total + commitCount,
      0,
    );

    repoActivity.set(
      repository.name,
      (repoActivity.get(repository.name) || 0) + commitCount,
    );
  });

  // PR 수 합산
  prRepos.forEach(({ repository, contributions }) => {
    const prCount = contributions.nodes.length;

    repoActivity.set(
      repository.name,
      (repoActivity.get(repository.name) || 0) + prCount,
    );
  });

  // 활동량 기준 내림차순 → 상위 5개
  const topRepos = [...repoActivity.entries()]
    .map(([name, activity]) => ({
      name,
      activity,
    }))
    .sort((a, b) => b.activity - a.activity)
    .slice(0, 5);

  // ==========
  return (
    <Card className="border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        <div className='flex gap-2.5 items-baseline'>
          <div className='text-3xl font-bold text-background dark:text-foreground max-[420px]:text-2xl'>
            Active Repository
          </div>
          <InfoTooltip content='Repositories ranked by combined commit and pull request activity over the past year'/>
        </div>
        
        <div className="mt-6 flex flex-col gap-2">
          {topRepos.map((repo, index) => (
            <div
              key={repo.name}
              className="flex justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 text-center text-lg text-muted-foreground font-semibold">
                  {index === 0 ? "🥇"
                    : index === 1 ? "🥈"
                    : index === 2 ? "🥉"
                    : `${index + 1}`}
                </span>

                <span className="text-lg text-muted-foreground max-[420px]:text-sm">
                  {repo.name}
                </span>
              </div>

              <span className="text-lg font-semibold text-secondary max-[420px]:text-sm">
                {repo.activity}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ActiveRepo;