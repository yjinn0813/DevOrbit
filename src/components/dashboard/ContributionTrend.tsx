/* Contribution Trend (최근 1년 월별 데이터 차트) */

import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardContent } from '../ui/card';
import type { GithubUser } from '../../../types/GithubUser';
import InfoTooltip from '../common/InfoTooltip';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip );

interface ContributionTrendProps {
  user: GithubUser;
}

// ====================
const ContributionTrend = ({ user } : ContributionTrendProps) => {
  // 월별 데이터를 배열로 변환
  const { weeks } = user.contributionsCollection.contributionCalendar;
  const monthlyData = Object.entries(
    weeks
      .flatMap((week) => week.contributionDays)
      .reduce<Record<string, number>>(
        (acc, { date, contributionCount }) => {
          const month = date.slice(0, 7);
          acc[month] = (acc[month] || 0) + contributionCount;
          return acc;
        },
        {},
      ),
  ).sort(([a], [b]) => a.localeCompare(b));

  // Chart.js 데이터 만들기
  const chartData = {
    labels: monthlyData.map(([month]) => month),
    datasets: [
      {
        label: 'Contributions',
        data: monthlyData.map(([, count]) => count),
        borderColor: '#06b6d4',
        backgroundColor: '#06b6d4',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: '#a1a1aa',
        }
      },
      y: {
        grid: {
          color: '#a1a1aa',
        }
      },
    }
  };

  // ===============
  return (
    <Card className="border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        <div className='flex gap-2.5 items-baseline'>
          <div className='text-3xl font-bold text-background dark:text-foreground max-[420px]:text-2xl'>
            Contribution Trend
          </div>
          <InfoTooltip content='Monthly contribution activity over the past year, based on GitHub contribution data' />
        </div>

        <div className="mt-6 flex flex-row items-center justify-center gap-10">
          <div className="mt-6 h-64 w-full md:h-80">
            <Line data={chartData} options={options} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ContributionTrend;