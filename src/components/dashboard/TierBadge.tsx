/* Profile Tier badge */

import { Card, CardContent} from '../ui/card';
import InfoTooltip from '../common/InfoTooltip';

const TierBadge = () => {
  return (
    <Card className="border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        <div className='flex gap-2.5 items-baseline'>
          <div className='text-3xl font-bold text-background dark:text-foreground max-[420px]:text-2xl'>
            Tier
          </div>
          <InfoTooltip content='Tier is determined based on the GitHub activity and contribution metrics'/>
        </div>

        <div className=''>
          뱃지 렌더링하기!
          {/* todo: 티어 뱃지 만들기 */}
        </div>
      </CardContent>
    </Card>
  )
}

export default TierBadge;