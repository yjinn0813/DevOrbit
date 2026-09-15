export const fetchGithubUser = async (username: string) => {
  const response = await fetch(
    `/api/github?username=${encodeURIComponent(username)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub data.");
  }

  return response.json();
};