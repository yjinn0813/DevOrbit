/* express server setting (local test) */

import express from "express";
import dotenv from "dotenv";
import { fetchGithubUser } from "./githubUser";
import { fetchContributionHistory } from "./contributionHistory";
import { calculateContributionStats } from "./utils/contribution";

dotenv.config({
  path: ".env.local",
});

const app = express();
const PORT = 3001;

app.get("/api/github", async (req, res) => {
  const token = process.env.GITHUB_TOKEN;
  const username = req.query.username;

  if (!token) {
    return res.status(500).json({
      message: "GITHUB_TOKEN is not configured.",
    });
  }

  if (
    typeof username !== "string" ||
    !username.trim()
  ) {
    return res.status(400).json({
      message: "GitHub username is required.",
    });
  }

  try {
    const data = await fetchGithubUser(
      username.trim(),
      token,
    );

    if (!data) {
      return res.status(404).json({
        message: "GitHub user not found.",
      });
    }

    const { createdAt, contributionsCollection } = data;

    const contributionHistory =
      await fetchContributionHistory(
        username.trim(),
        contributionsCollection.contributionYears,
        createdAt,
        token,
      );

    const contributionStats = calculateContributionStats(contributionHistory);

    const result = {
      ...data,

      data: {
        ...data,

        user: {
          ...data,
          contributionsCollection: {
            ...contributionsCollection,
            ...contributionStats,
          },
        }
      }
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error("GitHub API error:", error);

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch GitHub data.",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `API server running at http://localhost:${PORT}`,
  );
});