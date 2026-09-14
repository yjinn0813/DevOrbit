/* Local test server by Express */

import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const app = express();
const PORT = 3001;

const query = `
  query GetGithubUser($login: String!) {
    user(login: $login) {
      login
      name
      avatarUrl
      createdAt

      repositories(first: 100, ownerAffiliations: OWNER) {
        totalCount

        nodes {
          name
          stargazerCount

          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
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
        startedAt
        endedAt

        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalRepositoriesWithContributedCommits

        contributionCalendar {
          totalContributions

          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }

        commitContributionsByRepository(maxRepositories: 25) {
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
      }
    }
  }
`;

app.get("/api/github", async (req, res) => {
  const token = process.env.GITHUB_TOKEN;
  const username = req.query.username;

  if (!token) {
    return res.status(500).json({
      message: "GITHUB_TOKEN is not configured.",
    });
  }

  if (typeof username !== "string" || !username) {
    return res.status(400).json({
      message: "GitHub username is required.",
    });
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
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

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch {
    return res.status(500).json({
      message: "Failed to fetch data from GitHub.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});