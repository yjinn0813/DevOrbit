/* Web Share API 지원 여부 확인 및 공유 로직 */

import { useCallback } from "react";

export const useShare = () => {
  // navigator 객체가 존재하는지, navigator.share가 지원되는지 확인
  // (브라우저의 공유 기능 지원 여부 판단)
  const isShareSupported =
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function";

  // 공유 기능 실행 (useCallback을 사용하여 메모이제이션)
  const share = useCallback(async () => {
    if (!isShareSupported) return false; // 공유 기능이 지원되지 않으면 false

    try {
      await navigator.share({
        title: "DevOrbit",
        text: "Check out this developer on DevOrbit.",
        url: window.location.href,
      });

      return true;
    } catch (error) {
      // 사용자가 공유 창을 닫거나 취소한 경우
      if (error instanceof Error && error.name === "AbortError") {
        return false;
      }

      throw error;
    }
  }, [isShareSupported]);

  return { isShareSupported, share };
};