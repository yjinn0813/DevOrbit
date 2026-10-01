/* Github User Data GraphQL API (최근 1년 데이터) */

import { RateLimitError } from "./rateLimitError";
import type { GithubUser } from '../types/GithubUser';
const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

interface GithubGraphQLError {
  type: string;
  path?: string[];
  message: string;
}

interface GithubGraphQLResponse {
  data?: {
    user?: GithubUser | null;
  };
  errors?: GithubGraphQLError[];
}

// GitHub GraphQL API에서 유저 데이터 가져오기
export const fetchGithubUser = async (
  username: string,
  token: string,
): Promise<GithubUser | null> => {
  const query = `
    query GetGithubUser($login: String!) {
      user(login: $login) {
        login
        name
        avatarUrl
        createdAt

        repositories(
          first: 100
          ownerAffiliations: OWNER
          isFork: false
          privacy: PUBLIC
        ) {
          totalCount

          nodes {
            name
            stargazerCount
            forkCount

            languages(
              first: 10
              orderBy: {
                field: SIZE
                direction: DESC
              }
            ) {
              edges {
                size
                node {
                  name
                }
              }
            }
          }
        }

        contributionsCollection {
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalRepositoriesWithContributedCommits

          contributionYears

          contributionCalendar {
            totalContributions

            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }

          commitContributionsByRepository(
            maxRepositories: 25
          ) {
            repository {
              name
            }

            contributions(first: 100) {
              nodes {
                commitCount
                occurredAt
              }
            }
          }

          pullRequestContributionsByRepository(
            maxRepositories: 25
          ) {
            repository {
              name
            }

            contributions(first: 100) {
              nodes {
                occurredAt
              }
            }
          }
        }
      }
    }
  `;

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

  // Primary Rate Limit 잔여 요청 포인트 확인
  const remaining = response.headers.get("x-ratelimit-remaining");

  // Secondary Rate Limit 등 HTTP 403: 과도한 요청 방지
  if (!response.ok) {
    if (response.status === 403) {
      throw new RateLimitError(
        "GitHub API rate limit exceeded.",
      );
    }

    throw new Error(
      `GitHub API request failed with status ${response.status}.`,
    );
  }

  const result =
    (await response.json()) as GithubGraphQLResponse;

  // Primary Rate Limit: 사용량 초과
  if (result.errors?.length) {
    if (remaining === "0") {
      throw new RateLimitError(
        "GitHub API rate limit exceeded.",
      );
    }

    const error = result.errors[0];

    if (error.type === "NOT_FOUND" &&
      error.path?.[0] === "user"
    ) {
      return null;
    }

    throw new Error(error.message);
  }
  /*
    * GraphQL은 요청 자체가 정상적으로 처리되면 
    * HTTP 200을 반환하더라도 응답 본문에 errors를 포함할 수 있음
    * 따라서 response.ok만으로 요청 성공 여부를 판단할 수 없으며,
    * 응답의 errors 필드를 추가로 확인해야 함
  */

  if (!result.data?.user) {
    return null;
  }

  return result.data.user;
};