/* GET contribution History */

/*
 * GitHub 사용자의 전체 Contribution History를 조회
 *
 * contributionYears: 사용자가 Contribution을 남긴 연도 목록 배열
 *
 * 각 연도를 GraphQL alias로 묶어서
 * 하나의 HTTP 요청으로 전체 연도의 Contribution Calendar를 조회
*/

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface ContributionCalendar {
  weeks: {
    contributionDays: ContributionDay[];
  }[];
}

interface GithubContributionHistoryResponse {
  data?: {
    user: Record<
      string,
      {
        contributionCalendar: ContributionCalendar;
      }
    > | null;
  };

  errors?: {
    message: string;
  }[];
}

export interface ContributionHistoryDay {
  date: string;
  count: number;
}

/*
 * 연도별 Contribution Calendar 조회를 위한 GraphQL query 동적 생성
 *
 * 예:
 * y2024: contributionsCollection(
 *   from: "2024-01-01T00:00:00Z"
 *   to: "2024-12-31T23:59:59Z"
 * )
 */
const createContributionHistoryQuery = (
  years: number[],
  createdAt: string,
) => {
  const currentYear = new Date().getUTCFullYear();
  const createdDate = createdAt.slice(0, 10);

  const fragments = years
    .map((year) => {
      // 가입한 연도라면 실제 GitHub 가입일 이후부터 가져오기
      const from =
        year === Number(createdDate.slice(0, 4))
          ? `${createdDate}T00:00:00Z`
          : `${year}-01-01T00:00:00Z`;

      // 현재 연도라면 오늘까지만 조회
      const to =
        year === currentYear
          ? `${new Date().toISOString().slice(0, 10)}T23:59:59Z`
          : `${year}-12-31T23:59:59Z`;

      return `
        y${year}: contributionsCollection(
          from: "${from}"
          to: "${to}"
        ) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      `;
    })
    .join("\n");

  return `
    query GetContributionHistory($login: String!) {
      user(login: $login) {
        ${fragments}
      }
    }
  `;
};

// 사용자의 전체 Contribution History 가져오기
export const fetchContributionHistory = async (
  username: string,
  years: number[],
  createdAt: string,
  token: string,
): Promise<ContributionHistoryDay[]> => {  
  // Contribution을 남긴 연도가 없다면 계산할 데이터도 없음
  if (years.length === 0) {
    return [];
  }

  const query = createContributionHistoryQuery(
    years,
    createdAt,
  );

  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query,
      variables: {
        login: username,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(
      `GitHub contribution history request failed with status ${response.status}.`,
    );
  }

  const result =
    (await response.json()) as GithubContributionHistoryResponse;

  if (result.errors?.length) {
    throw new Error(result.errors[0].message);
  }

  if (!result.data?.user) {
    throw new Error("GitHub user not found.");
  }

  /*
   * GraphQL alias로 조회했기 때문에 응답 형식:
   *
   * {
   *   y2024: {...},
   *   y2025: {...},
   *   y2026: {...}
   * }
   *
   * 이것을 프론트/계산 함수에서 사용하려고 1차원 배열로 변환
   */
  const contributions: ContributionHistoryDay[] = [];

  for (const year of years) {
    const calendar = result.data.user[`y${year}`]
      ?.contributionCalendar;

    if (!calendar) {
      continue;
    }

    for (const week of calendar.weeks) {
      for (const day of week.contributionDays) {
        contributions.push({
          date: day.date,
          count: day.contributionCount,
        });
      }
    }
  }

  // 날짜 기준으로 중복 제거 (결과가 겹치는 경우를 대비)
  const uniqueContributions = new Map<
    string,
    number
  >();

  for (const contribution of contributions) {
    uniqueContributions.set(
      contribution.date,
      contribution.count,
    );
  }

  return Array.from(uniqueContributions.entries())
    .map(([date, count]) => ({
      date,
      count,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
};