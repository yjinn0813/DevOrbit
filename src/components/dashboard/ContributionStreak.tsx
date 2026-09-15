/* Contribution Streak */

import { Card, CardContent } from '../ui/card';
import InfoTooltip from '../common/InfoTooltip';

const ContributionStreak = () => {
  return (
    <Card className="border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        <div className='flex gap-2.5 items-baseline'>
          <div className='text-3xl font-bold text-background dark:text-foreground max-[420px]:text-2xl'>
            Longest Contribution Streak
          </div>
          <InfoTooltip content='Longest consecutive contribution streak based on GitHub contribution data'/>
        </div>
        
        <div>
          {/* todo */}
          - Current Streak (최근 1년 중 연속 활동이 언제이고 며칠인지)
          <br />
          - 가입일부터 지금까지의 Longest Streak → ex. 8일, 2024.4.17부터 4.24까지
          <br />
          - total contributions: 가입일부터 지금까지의 모든 contribution 개수
        </div>
      </CardContent>
    </Card>
    
  )
}

export default ContributionStreak;