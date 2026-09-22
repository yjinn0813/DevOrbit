/* Tier badge constants */

// Tier level
export interface TierInfo {
  name: string;
  minScore: number;
  maxScore: number;
  color: string;
}

export const TIER_CONFIG: TierInfo[] = [
  { name: "Iron", minScore: 0, maxScore: 9, color: "#71717a" },
  { name: "Bronze", minScore: 10, maxScore: 19, color: "#cd7f32" },
  { name: "Silver", minScore: 20, maxScore: 29, color: "#c0c0c0" },
  { name: "Gold", minScore: 30, maxScore: 39, color: "#ffd700" },
  { name: "Platinum", minScore: 40, maxScore: 49, color: "#e5e4e2" },
  { name: "Emerald", minScore: 50, maxScore: 59, color: "#6EE7A0" },
  { name: "Sapphire", minScore: 60, maxScore: 74, color: "#1683FF" },
  { name: "Ruby", minScore: 75, maxScore: 89, color: "#EF3F5F" },
  { name: "Diamond", minScore: 90, maxScore: 100, color: "#b9f2ff" },
] as const;

// ====================
// score calculate
export interface TierStats {
  commitCount: number;
  prCount: number;
  issueCount: number;
  contributedRepoCount: number;
  totalStars: number;
  totalForks: number;
  ownRepoCount: number;
}

export const calculateTierScore = (stats: TierStats): number => {
  return (
    Math.min(20, stats.prCount * 2) +
    Math.min(20, Math.floor(stats.commitCount / 10)) +
    Math.min(10, stats.issueCount) +
    Math.min(10, stats.contributedRepoCount * 2) +
    Math.min(20, stats.totalStars * 2) +
    Math.min(10, stats.totalForks * 2) +
    Math.min(10, stats.ownRepoCount)
  );
};

/** 
  == Tier (9 levels) ==
  Iron (아이언): 0 ~ 9점 (시작 단계)
  Bronze (브론즈): 10 ~ 19점
  Silver (실버): 20 ~ 29점
  Gold (골드): 30 ~ 39점
  Platinum (플래티넘): 40 ~ 49점
  Emerald (에메랄드): 50 ~ 59점
  Sapphire (사파이어): 60 ~ 74점
  Ruby (루비): 75 ~ 89점
  Diamond (다이아몬드): 90 ~ 100점 (최상위 등급)

  == Tier calculate ==
  최근 1년 활동 지수 (최대 60점)
    PR 수 (20점): PR 1개당 2점 (10개 달성 시 만점) — 코드 리뷰 및 협업의 가치가 가장 높으므로 높은 점수 부여
    커밋 수 (20점): 커밋 10개당 1점 (200개 달성 시 만점) — 꾸준한 개발 활동량 반영
    이슈 수 (10점): 이슈 1개당 1점 (10개 달성 시 만점) — 문제 정의 및 토론 기여 반영
    기여 수 (10점): 타인/외부 레포 기여 1개당 2점 (5개 달성 시 만점) — 오픈소스 및 외부 프로젝트 참여도

  전체 기간 성과 지수 (최대 40점)
    받은 스타 수 (20점): Star 1개당 2점 (10개 달성 시 만점) — 프로젝트의 영향력 및 유저 호응도
    받은 포크 수 (10점): Fork 1개당 2점 (5개 달성 시 만점) — 코드 재사용성 및 파급력
    보유 레포 수 (10점): Fork해온 레포 제외, 직접 생성한 레포 1개당 1점 (10개 달성 시 만점) — 자신만의 프로젝트 보유량
*/