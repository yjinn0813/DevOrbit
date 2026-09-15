/* Detail page - Top languages card */

import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent } from '../ui/card'; 
import InfoTooltip from '../common/InfoTooltip';
import { languageColors } from '../../constants/LangColors';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

interface LanguageChartProps {
  user: {
    repositories: {
      nodes: {
        languages: {
          edges: {
            size: number;
            node: {
              name: string;
            };
          }[];
        };
      }[];
    };
  };
}

// ====================
const LanguageChart = ({ user }: LanguageChartProps) => {
  const languageSizes: Record<string, number> = {};

  // 각 repository의 언어별 코드 크기(size)를 언어별로 합산
  user.repositories.nodes.forEach((repo) => {
    repo.languages.edges.forEach((edge) => {
      const language = edge.node.name;

      languageSizes[language] =
        (languageSizes[language] || 0) + edge.size;
    });
  });

  // 모든 언어의 코드 크기를 합산하여 전체 코드 크기 계산
  const totalSize = Object.values(languageSizes).reduce(
    (total, size) => total + size,
    0,
  );

  // 언어별 코드 크기를 전체 코드 크기로 나누어 점유율(%) 계산 후, 크기가 큰 순서대로 6개 정렬
  const languages = Object.entries(languageSizes)
    .map(([name, size]) => ({
      name,
      size,
      percentage: (size / totalSize) * 100,
    }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 6);
  
  // Chart.js에서 사용할 언어 이름(labels)과 점유율(data) 생성
  const chartData = {
    labels: languages.map((language) => language.name),
    datasets: [
      {
        data: languages.map((language) => language.percentage),
        backgroundColor: languages.map(
          (language) => languageColors[language.name] ?? '#71717a',
        ),
      },
    ],
  };

  // 막대 방향 가로로 설정
  const options = {
    indexAxis: 'y' as const,
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

  // ====================
  return (
    <Card className="border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        <div className='flex gap-2.5 items-baseline'>
          <div className='text-3xl font-bold text-background dark:text-foreground max-[420px]:text-2xl'>
            Top Languages
          </div>
          <InfoTooltip content='Language distribution across the user owned, non-fork repositories, based on code size' />
        </div>

        <div className="mt-6 flex flex-row items-center justify-center gap-10">
          {/* Chart */}
          <div className='h-80 w-full md:w-[55%]'>
            <Bar data={chartData} options={options} />
          </div>
          
          {/* Legend */}
          <div className="flex flex-col gap-3">
            {languages.map((language) => (
              <div key={language.name} className="flex items-center gap-2">
                <div
                  className="size-3 rounded-full"
                  style={{
                    backgroundColor: languageColors[language.name] ?? '#71717A',
                  }}
                />

                <span className="text-muted-foreground">
                  {language.name}
                </span>

                <span className="text-muted-foreground">
                  {language.percentage.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default LanguageChart;