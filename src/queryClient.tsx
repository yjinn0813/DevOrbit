import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // API 응답 실패시 최대 재요청 횟수
      refetchOnWindowFocus: false, // 유저가 다른 탭 다녀와도 자동 재요청 방지
      staleTime: 1000 * 60 * 5, // 데이터 유지 시간 (재요청 방지)
    },
  },
});

export default queryClient;