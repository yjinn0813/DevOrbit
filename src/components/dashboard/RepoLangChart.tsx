/* Repository Language Distribution 레포별 언어점유율 차트 */

import { useState } from 'react';
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent } from '../ui/card'; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import InfoTooltip from '../common/InfoTooltip';
import EmptyState from '../common/EmptyState';
import type { GithubUser } from '../../../types/GithubUser';
import { languageColors } from '../../constants/LangColors';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

interface LanguageChartProps {
  user: GithubUser;
}

// ====================
const RepoLangChart = ({ user }: LanguageChartProps) => {
  const repos = user.repositories.nodes;
  const defaultRepoName =
    repos.find((repo) => repo.languages.edges.length > 0)?.name ??
    repos[0]?.name ??
    '';
  
  const [selectedRepoName, setSelectedRepoName] = useState<string | null>(defaultRepoName || null);

  const selectedRepo = user.repositories.nodes.find(
    (repo) => repo.name === selectedRepoName,
  );

  // Chart.js에서 사용할 언어 이름(labels)과 점유율(data) 생성
  const languageEdges = selectedRepo?.languages.edges ?? [];
  const totalSize = languageEdges.reduce(
    (total, edge) => total + edge.size, 0
  );
  
  const languages = languageEdges.map((edge) => ({
    name: edge.node.name,
    size: edge.size,
    percentage: totalSize > 0 ? (edge.size / totalSize) * 100 : 0,
  }));

  const chartData = {
    labels: languageEdges.map((edge) => edge.node.name),
    datasets: [
      {
        data: languageEdges.map((edge) => 
          totalSize > 0 ? (edge.size / totalSize) * 100 : 0
        ),
        backgroundColor: languageEdges.map(
          (edge) => languageColors[edge.node.name] ?? '#71717a'
        ),
      }
    ]
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
        <div className="flex items-baseline gap-2.5">
          <div className="text-3xl font-bold text-background dark:text-foreground max-[420px]:text-2xl">
            Repository Languages
          </div>
          <InfoTooltip content="Language distribution by code size for only user created repository. The most recently created repository with language data is selected by default." />
        </div>

        <div className="mt-6 flex flex-col gap-6 md:flex-row md:gap-10">
          {repos.length === 0 ? (
            // 1. 레포가 없는 경우
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-2 w-full">
              <Select
                value={selectedRepoName}
                onValueChange={setSelectedRepoName}
              >
                <SelectTrigger className="w-50">
                  <SelectValue placeholder="Select a repository" />
                </SelectTrigger>

                <SelectContent>
                  {repos.map((repo) => (
                    <SelectItem key={repo.name} value={repo.name}>
                      {repo.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {!selectedRepo || selectedRepo.languages.edges.length === 0 ? (
                // 2. 선택한 레포에 언어 정보가 없는 경우
                <EmptyState />
              ) : (
                // 3. 선택한 레포에 언어 정보가 있는 경우
                <div className='flex flex-col items-center justify-center gap-6 md:flex-row md:gap-10'>
                  {/* Chart */}
                  <div className="h-64 w-full md:w-[55%] md:h-80">
                    <Bar data={chartData} options={options} />
                  </div>

                  {/* Legend */}
                  <div className="
                    grid grid-cols-1 gap-y-3
                    min-[481px]:grid-cols-2 min-[481px]:gap-x-12
                    md:grid-cols-1
                  ">
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
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default RepoLangChart;