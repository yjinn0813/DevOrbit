/* contribution data calculate */

import type { ContributionHistoryDay } from "../contributionHistory";

// 특정 날짜 사이의 차이 계산 (날짜가 정확히 하루 차이인지 확인)
const getDateDifference = (
  previousDate: string,
  currentDate: string,
): number => {
  const previous = new Date(
    `${previousDate}T00:00:00Z`,
  );

  const current = new Date(
    `${currentDate}T00:00:00Z`,
  );

  return Math.floor(
    (current.getTime() - previous.getTime()) /
      (1000 * 60 * 60 * 24),
  );
};

// 연도별 Contribution 수 계산
export const calculateYearlyContributions = (
  contributions: ContributionHistoryDay[],
) => {
  const yearlyContributions: Record<
    number,
    number
  > = {};

  for (const { date, count } of contributions) {
    const year = Number(date.slice(0, 4));

    yearlyContributions[year] =
      (yearlyContributions[year] ?? 0) + count;
  }

  return Object.entries(yearlyContributions)
    .map(([year, count]) => ({
      year: Number(year),
      count,
    }))
    .sort((a, b) => a.year - b.year);
};

// 가입일부터 전체 Contribution 수 계산
export const calculateTotalContributions = (
  contributions: ContributionHistoryDay[],
) => {
  return contributions.reduce(
    (total, { count }) => total + count,
    0,
  );
};

// Contribution이 1개 이상 발생한 날짜 수 계산
export const calculateActiveDays = (
  contributions: ContributionHistoryDay[],
) => {
  return contributions.filter(
    ({ count }) => count > 0,
  ).length;
};

// Longest Streak 기록 계산
export const calculateLongestStreak = (
  contributions: ContributionHistoryDay[],
) => {
  let longestStreak = 0;
  let currentStreak = 0;

  let longestStart = "";
  let longestEnd = "";
  let currentStart = "";

  for (let index = 0; index < contributions.length; index++) {
    const current = contributions[index];

    if (current.count <= 0) {
      currentStreak = 0;
      currentStart = "";
      continue;
    }

    // 첫번째 active day
    if (currentStreak === 0) {
      currentStreak = 1;
      currentStart = current.date;
    } else {
      const previous = contributions[index - 1];

      const difference = getDateDifference(
        previous.date,
        current.date,
      );

      // 바로 다음 날짜가 아니면 streak가 끊긴 것으로 처리
      if (
        previous.count > 0 &&
        difference === 1
      ) {
        currentStreak += 1;
      } else {
        currentStreak = 1;
        currentStart = current.date;
      }
    }

    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
      longestStart = currentStart;
      longestEnd = current.date;
    }
  }

  return {
    count: longestStreak,
    startDate: longestStart,
    endDate: longestEnd,
  };
};

// 최근 연속 Current Streak 기록 계산 (가장 최근 날짜부터 거꾸로 확인)
export const calculateCurrentStreak = (
  contributions: ContributionHistoryDay[],
) => {
  if (contributions.length === 0) {
    return {
      count: 0,
      startDate: "",
      endDate: "",
    };
  }

  let streak = 0;
  let startDate = "";
  let endDate = "";

  for (
    let index = contributions.length - 1;
    index >= 0;
    index--
  ) {
    const current = contributions[index];

    // 최근에 Contribution이 없다면 현재 streak는 0
    if (current.count <= 0) {
      break;
    }

    if (streak === 0) {
      streak = 1;
      startDate = current.date;
      endDate = current.date;
      continue;
    }

    const next = contributions[index + 1];

    const difference = getDateDifference(
      current.date,
      next.date,
    );

    if (
      next.count > 0 &&
      difference === 1
    ) {
      streak += 1;
      startDate = current.date;
    } else {
      break;
    }
  }

  return {
    count: streak,
    startDate,
    endDate,
  };
};

// Contribution History에서 필요한 모든 통계를 한 번에 계산
export const calculateContributionStats = (
  contributions: ContributionHistoryDay[],
) => {
  const yearlyContributions =
    calculateYearlyContributions(contributions);

  const totalContributions =
    calculateTotalContributions(contributions);

  const activeDays =
    calculateActiveDays(contributions);

  const longestStreak =
    calculateLongestStreak(contributions);

  const currentStreak =
    calculateCurrentStreak(contributions);

  return {
    yearlyContributions,
    totalContributions,
    activeDays,
    longestStreak,
    currentStreak,
  };
};