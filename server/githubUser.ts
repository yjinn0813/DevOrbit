/* Github User Data GraphQL API (최근 1년 데이터) */

import type { GithubUser } from '../types/GithubUser';
const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

interface GithubGraphQLResponse {
  data?: {
    user: GithubUser | null;
  };

  errors?: {
    message: string;
  }[];
}

/*
 * GitHub GraphQL API에서 유저 데이터 가져오기
 */
export const fetchGithubUser = async (
  username: string,
  token: string,
): Promise<GithubUser> => {
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

  if (!response.ok) {
    throw new Error(
      `GitHub API request failed with status ${response.status}.`,
    );
  }

  const result =
    (await response.json()) as GithubGraphQLResponse;

  /*
   * GraphQL은 HTTP 200이어도 errors가 포함될 수 있음
   * response.ok만 확인하면 안됨
   */
  if (result.errors?.length) {
    throw new Error(result.errors[0].message);
  }

  if (!result.data?.user) {
    throw new Error("GitHub user not found.");
  }

  return result.data.user;
};