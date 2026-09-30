import { useQuery } from "@tanstack/react-query";
import { fetchGithubUser } from "../api/github";

export const useGithubUser = (username: string) => {
  return useQuery({
    queryKey: ["github-user", username],
    queryFn: () => fetchGithubUser(username),
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 30 * 60 * 1000, // 30분
    refetchOnMount: true, // 기본값
  });
};

/** 
 * staleTime: 캐시가 신선하다고 인정하는 시간, 불필요한 재요청 방지
 * gcTime: 사용하지 않는 캐시를 얼마나 오래 보관할지, 캐시의 생존시간
 * refetchOnMount: stale 상태의 캐시가 있을 때 컴포넌트가 다시 마운트되면 데이터 재요청
*/