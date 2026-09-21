// Repository Record types

interface RepositoryContribution {
  date: string;
  count: number;
}

export interface RepositoryRecord {
  repository: string;
  contributions: RepositoryContribution[];
}