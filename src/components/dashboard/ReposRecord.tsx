/* 최근 1년 레포별 잔디 시각화 */

import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { CalendarHeatmap, CalendarHeatmapBody, 
  CalendarHeatmapBlock, CalendarHeatmapFooter, CalendarHeatmapLegend, } from '../ui/heatmap/calendar-heatmap';
import type { RepositoryRecord } from '../../../types/RepositoryRecord';
import InfoTooltip from '../common/InfoTooltip';
import EmptyState from '../common/EmptyState';

interface ReposRecordProps {
  repos: RepositoryRecord[]
}

interface TooltipState {
  date: string;
  count: number;
  x: number;
  y: number;
}

// 없는 날짜는 0으로 예외처리
const fillMissingDates = (
  contributions: RepositoryRecord['contributions'],
) => {
  const contributionMap = new Map(
    contributions.map(({ date, count }) => [
      date,
      count,
    ]),
  );

  const dates: {
    date: string;
    count: number;
  }[] = [];

  const today = new Date();
  const startDate = new Date(today);
  startDate.setFullYear(startDate.getFullYear() - 1 );

  for (
    const date = new Date(startDate);
    date <= today;
    date.setDate(date.getDate() + 1)
  ) {
    const dateString = date.toISOString().slice(0, 10);

    dates.push({
      date: dateString,
      count: contributionMap.get(dateString) ?? 0,
    });
  }

  return dates;
};

// ===============
const ReposRecord = ({ repos }: ReposRecordProps) => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  return(
    <Card className="border border-secondary/50 bg-foreground dark:bg-card">
      <CardContent className="flex flex-col">
        <div className='flex gap-2.5 items-baseline'>
          <div className='text-3xl font-bold text-background dark:text-foreground max-[420px]:text-2xl'>
            Repositories Record
          </div>
          <InfoTooltip content='Daily contribution activity for the most active repositories over the past year, based on commits and pull requests'/>
        </div>

        <div className="mt-6">
          {repos.length === 0 ? (
            <EmptyState />
          ) : (           
            <Tabs defaultValue={repos[0].repository}>
              {/* tabs */}
              <TabsList className="h-auto justify-start gap-1 rounded-lg p-2">
                {repos.map(({ repository }) => (
                  <TabsTrigger
                    key={repository}
                    value={repository}
                    className='
                      flex-1 px-3 py-2.5
                      transition-all
                      hover:bg-accent
                    '
                  >
                    {repository}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* heatmap */}
              {repos.map(({ repository, contributions }) => {
                const filledContributions = fillMissingDates(contributions);

                return (
                  <TabsContent
                    key={repository}
                    value={repository}
                  >
                    <CalendarHeatmap 
                      data={filledContributions.map(
                        ({ date, count }) => ({
                          date,
                          value: count,
                        }),
                      )}
                      weekStart={1}
                      continuousMonths
                    >
                      <CalendarHeatmapBody hideYearLabels
                        labelClassName="text-muted-foreground"
                      >
                        {({ activity, dayIndex, weekIndex }) => (
                          <CalendarHeatmapBlock 
                            activity={activity}
                            dayIndex={dayIndex}
                            weekIndex={weekIndex}
                            onMouseEnter={(event) => {
                              const rect = event.currentTarget.getBoundingClientRect(); 
                              setTooltip({ 
                                date: activity.date, 
                                count: activity.value, 
                                x: rect.left + rect.width / 2,
                                y: rect.top, 
                              }); 
                            }} 
                            onMouseLeave={() => { setTooltip(null); }}
                          />
                        )}
                      </CalendarHeatmapBody>

                      <CalendarHeatmapFooter>
                        <CalendarHeatmapLegend />
                      </CalendarHeatmapFooter>
                    </CalendarHeatmap>
                    
                    {/* heatmap tooltip */}
                    {tooltip && (
                      <div className='
                        pointer-events-none fixed rounded-md border border-border bg-popover
                        px-2.5 py-1.5 text-xs text-popover-foreground shadow-md
                        z-50 -translate-x-1/2 -translate-y-full
                        '
                        style={{
                          left: tooltip.x,
                          top: tooltip.y - 8
                        }}
                      >
                        <div className='font-medium'>{tooltip.date}</div>
                        <div>{tooltip.count} contributions</div>
                      </div>
                    )}
                  </TabsContent>
                )
              })}
            </Tabs>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ReposRecord;