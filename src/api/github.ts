/*
 * 커스텀 클래스 생성:
 * API 요청 실패 시 HTTP 상태 코드와 에러 메시지를 함께 전달
 */
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message); // 부모 Error 초기화
    this.status = status;
    this.name = "ApiError";
  }
}

/*
 * 서버의 GitHub 사용자 데이터를 조회:
 * API 요청 실패 시, 상태 코드와 메시지를 ApiError에 담아 전달
 */
export const fetchGithubUser = async (username: string) => {
  const response = await fetch(
    `/api/github?username=${encodeURIComponent(username)}`,
  );

  if (!response.ok) {
    const data = await response.json();

    throw new ApiError(
      response.status,
      data.message || "Failed to fetch GitHub data.",
    );
  }

  return response.json();
};