import { useQuery } from "@tanstack/react-query";
import { fetchGithubUser } from "../api/github";

export const useGithubUser = (username: string) => {
  return useQuery({
    queryKey: ["github-user", username],
    queryFn: () => fetchGithubUser(username),
    enabled: !!username,
    networkMode: "always", // 오프라인 상태에서도 작동
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 30 * 60 * 1000, // 30분
    refetchOnMount: true, // 기본값
  });
};

/** 
 * staleTime: 캐시가 신선하다고 인정하는 시간, 불필요한 재요청 방지
 * gcTime: 사용하지 않는 캐시를 얼마나 오래 보관할지, 캐시의 생존시간
 * refetchOnMount: stale 상태의 캐시가 있을 때 컴포넌트가 다시 마운트되면 데이터 재요청
 * 
 * isPending: 아직 query의 성공/실패 결과가 없는 상태
 * isLoading: 최초 query 실행 중인 상태 (isPending && isFetching 상태)
 * isFetching: queryFn이 실행 중인 상태, 최초 요청뿐만 아니라 refetch도 포함
 * isError: query가 실패하여 에러 상태인 경우 true
 * data: 성공한 데이터가 있으면 존재하며, refetch 중에도 기존 캐시 데이터가 유지될 수 있음
 *
 * fetchStatus:
 * - fetching: queryFn이 실행 중
 * - paused: 네트워크 상태 등으로 query 실행이 일시 중지된 상태
 * - idle: queryFn이 실행 중이지 않은 상태
 */