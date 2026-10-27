/* Vercel serverless function for GitHub API */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { RateLimitError, OrganizationError } from "../server/error";
import { fetchGithubUser } from "../server/githubUser";
import { fetchContributionHistory } from "../server/contributionHistory";
import { calculateContributionStats } from "../server/utils/contribution";
import { calculateRepositoryContributions, getTopRepositories } from "../server/utils/repository";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({
      message: "Method not allowed.",
    });
  }

  const token = process.env.GITHUB_TOKEN;
  const username = req.query.username;

  if (!token) {
    return res.status(500).json({
      message: "GITHUB_TOKEN is not configured.",
    });
  }

  if (typeof username !== "string" || !username.trim()) {
    return res.status(400).json({
      message: "GitHub username is required.",
    });
  }

  try {
    const normalizedUsername = username.trim();

    const data = await fetchGithubUser(normalizedUsername, token);

    if (!data) {
      return res.status(404).json({
        message: "GitHub user not found.",
      });
    }

    const { createdAt, contributionsCollection } = data;

    const contributionHistory = await fetchContributionHistory(
      normalizedUsername,
      contributionsCollection.contributionYears,
      createdAt,
      token,
    );

    const contributionStats =
      calculateContributionStats(contributionHistory);

    const repositoryContributions = calculateRepositoryContributions(
      contributionsCollection.commitContributionsByRepository,
      contributionsCollection.pullRequestContributionsByRepository,
    );

    const repositoryRecords = getTopRepositories(
      repositoryContributions,
      3,
    );

    const result = {
      ...data,
      data: {
        ...data,
        user: {
          ...data,
          repositoryRecords,
          contributionsCollection: {
            ...contributionsCollection,
            ...contributionStats,
          },
        },
      },
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error("GitHub API error:", error);

    if (error instanceof RateLimitError) {
      return res.status(403).json({
        message: error.message,
      });
    }

    if (error instanceof OrganizationError) {
      return res.status(422).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch GitHub data.",
    });
  }
}
