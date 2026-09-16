// GraphQL 쿼리의 응답 구조 전체 (user)

export interface GithubUser {
  login: string;
  name: string | null;
  avatarUrl: string;
  createdAt: string;

  repositories: {
    totalCount: number;

    nodes: {
      name: string;
      stargazerCount: number;
      forkCount: number;

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

  contributionsCollection: {
    totalCommitContributions: number;
    totalIssueContributions: number;
    totalPullRequestContributions: number
    totalRepositoriesWithContributedCommits: number;
    contributionYears: number[];

    contributionCalendar: {
      totalContributions: number;
      weeks: {
        contributionDays: {
          date: string;
          contributionCount: number;
        };
      }[];
    };

    commitContributionsByRepository: {
      repository: {
        name: string;
      };

      contributions: {
        nodes: {
          commitCount: number;
          occurredAt: string;
        }[];
      };
    }[];

    pullRequestContributionsByRepository: {
      repository: {
        name: string;
      };

      contributions: {
        nodes: {
          occurredAt: string;
        }[];
      };
    }[];
  };
};