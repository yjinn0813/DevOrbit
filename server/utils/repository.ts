/* Repository Record calculate function */

import { RepositoryRecord } from '../../types/RepositoryRecord';

interface CommitContribution {
  repository: {
    name: string;
  };
  contributions: {
    nodes: {
      commitCount: number;
      occurredAt: string;
    }[];
  };
}

interface PullRequestContribution {
  repository: {
    name: string;
  };
  contributions: {
    nodes: {
      occurredAt: string;
    }[];
  };
}

// repo별 contribution calculate
export const calculateRepositoryContributions = (
  commits: CommitContribution[],
  pullRequests: PullRequestContribution[],
): RepositoryRecord[] => {
  const repositoryMap = new Map<
    string,
    Map<string, number>
  >();

  const addContribution = (
    repositoryName: string,
    date: string,
    count: number,
  ) => {
    if (!repositoryMap.has(repositoryName)) {
      repositoryMap.set(repositoryName, new Map());
    }

    const dateMap = repositoryMap.get(repositoryName)!;

    dateMap.set(
      date,
      (dateMap.get(date) ?? 0) + count,
    );
  };

  // Commit
  commits.forEach((repo) => {
    repo.contributions.nodes.forEach(
      ({ commitCount, occurredAt }) => {
        const date = occurredAt.slice(0, 10);

        addContribution(
          repo.repository.name,
          date,
          commitCount,
        );
      },
    );
  });

  // Pull Request
  pullRequests.forEach((repo) => {
    repo.contributions.nodes.forEach(
      ({ occurredAt }) => {
        const date = occurredAt.slice(0, 10);

        addContribution(
          repo.repository.name,
          date,
          1,
        );
      },
    );
  });

  // Repository마다 날짜별 Contribution 데이터 생성 및 정렬
  return Array.from(repositoryMap.entries()).map(
    ([repository, dateMap]) => ({
      repository,
      contributions: Array.from(dateMap.entries())
        .map(([date, count]) => ({
          date,
          count,
        }))
        .sort((a, b) =>
          a.date.localeCompare(b.date),
        ),
    }),
  );
};

// Top 3 추출
export const getTopRepositories = (
  repositories: RepositoryRecord[],
  limit = 3,
): RepositoryRecord[] => {
  return repositories
    .map((repository) => ({
      ...repository,
      totalActivity: repository.contributions.reduce(
        (total, contribution) =>
          total + contribution.count,
        0,
      ),
    }))
    .sort(
      (a, b) =>
        b.totalActivity - a.totalActivity,
    )
    .slice(0, limit)
    .map(
      ({
        repository,
        contributions,
      }) => ({
        repository,
        contributions,
      }),
    );
};