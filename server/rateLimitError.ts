// GitHub API Rate Limit 발생을 나타내는 커스텀 에러

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RateLimitError";
  }
}