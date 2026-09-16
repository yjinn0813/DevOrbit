/* Profile Tier badge */

import { Card, CardContent} from '../ui/card';
import type { GithubUser } from '../../../types/GithubUser';
import InfoTooltip from '../common/InfoTooltip';
import { GemIcon } from '../dashboard/GemIcon';
import { calculateTierScore, TIER_CONFIG } from '../../constants/TierConfig';

interface TierProps {
  user: GithubUser
}

// ====================
const TierBadge = ({ user }: TierProps) => {
  const { contributionsCollection, repositories } = user;

  const totalStars = repositories.nodes.reduce(
    (total, repo) => total + repo.stargazerCount,
    0,
  );

  const totalForks = repositories.nodes.reduce(
    (total, repo) => total + repo.forkCount,
    0,
  )

  const stats = {
    commitCount: contributionsCollection.totalCommitContributions,
    prCount: contributionsCollection.totalPullRequestContributions,
    issueCount: contributionsCollection.totalIssueContributions,
    contributedRepoCount: contributionsCollection.totalRepositoriesWithContributedCommits,
    totalStars,
    totalForks, 
    ownRepoCount: repositories.totalCount,
  }

  const score = calculateTierScore(stats);

  const tier = TIER_CONFIG.find(
    ({ minScore, maxScore }) =>
      score >= minScore && score <= maxScore
  )

  if (!tier){
    return null;
  }

  // ====================
  return (
    <Card className="border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        <div className='flex gap-2.5 items-baseline'>
          <div className='text-3xl font-bold text-background dark:text-foreground max-[420px]:text-2xl'>
            Tier
          </div>
          <InfoTooltip content='Tier is determined based on the GitHub activity and contribution metrics'/>
        </div>

        <div className="mt-5 flex flex-row items-center justify-evenly gap-4">
          <GemIcon color={tier.color} />
          <div className='flex flex-col items-center gap-1'>
            <div className="text-lg text-muted-foreground">
              {tier.name}
            </div>
            <span className="text-2xl text-secondary font-semibold ">
              {score}
              <span className='ml-1 text-base font-normal text-muted-foreground'>
                pts
              </span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TierBadge;