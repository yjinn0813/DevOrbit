# DevOrbit 📡

<br>
<p align=center><img src="https://github.com/yjinn0813/DevOrbit/blob/main/public/images/LOGO.png" width="600"></p>
<br>
DevOrbit는 GitHub 활동 데이터를 수집하고 가공하여, 개발자의 활동 흐름과 Repository 정보를 시각적으로 확인할 수 있도록 구성한 개발자 대시보드입니다. GitHub GraphQL API를 기반으로 Contribution, Repository, Language 등의 데이터를 조회하고, 이를 차트와 통계 카드로 시각화합니다.

<br>

## 1. 프로젝트 목적
- GitHub GraphQL API를 활용한 데이터 조회 및 가공 경험
- shadcn/ui와 Chart.js를 활용한 대시보드 UI 구성 및 데이터 시각화 학습
- pnpm을 활용한 패키지 관리 및 프로젝트 의존성 관리 학습
- React/TypeScript 기반의 컴포넌트 설계 및 비동기 데이터 처리 경험

<br>

## 2. 개발 기간 & 단계
- **기간**: 2026.09 ~
- **개발 단계**:
  - Phase 1. 프로젝트 초기 세팅 & 디자인 시스템 설계
  - Phase 2. GitHub API 연동 & 로컬 API 서버 구축 (Express)
  - Phase 3. 데이터 가공 & 대시보드 기능 구현 (Shadcn/ui)
  - Phase 4. API 구조 개선 & 데이터 확장
  - Phase 5. UI/UX 개선 & 반응형 대응
  - Phase 6. 성능 최적화 & 배포

<br>

## 3. 주요 기능 및 페이지 구성
### Home
* GitHub GraphQL API를 활용한 username 검색
* 검색 결과에 따른 Detail 페이지 이동
* 잘못된 username 조회 시 Not Found 페이지 제공
* GitHub API 또는 네트워크 오류 발생 시 Error 페이지 제공

### Detail
* GitHub 사용자 프로필 및 기본 정보 제공
* GitHub Contribution 데이터를 기반으로 한 Tier 제공
* GitHub Contribution 및 Repository 통계 제공
* Chart.js를 활용한 월별 Contribution 추이 및 Top Languages 시각화
* 최근 1년간 활동을 기준으로 한 Most Active Repository 제공
* 연속 Contribution 기록을 기반으로 한 Longest Contribution Streak 제공
* shadcn/ui를 활용한 Card, Tooltip, Input, Button 등 UI 구성
* 각 데이터를 독립적인 Card Component로 구성
* 반응형 레이아웃 지원

### Not Found
* 존재하지 않는 경로 또는 GitHub 사용자를 조회한 경우 404 페이지 제공

### Error
* GitHub API 또는 네트워크 오류 발생 시 에러 화면 제공
* 재시도 기능 제공

<br>

## 4. 데이터 집계 기준
DevOrbit는 GitHub GraphQL API를 통해 조회한 데이터를 Contribution, Repository, Tier 등 영역으로 구분하고, 각 항목의 목적에 맞는 기간과 집계 기준을 적용하여 대시보드에 표시합니다.

### Tier
* 최근 1년간 Contribution 활동과 전체 Repository 활동을 기반으로 사용자 활동 점수를 계산
* 계산된 점수 구간에 따라 Iron부터 Diamond까지 9단계 Tier를 부여

### Contribution
| 항목 | 기간 | 집계 기준 |
| ------ | ------ | ------ |
| `Activity Overview` | 최근 1년 | Commit, Pull Request, Issue 및 전체 Contribution 수를 각각 집계 |
| `Monthly Trend` | 최근 1년 | 일별 Contribution 데이터를 월 단위로 그룹화하여 월별 Contribution 수를 합산 |
| `Yearly Trend` | 전체 기간 | 전체 Contribution 기록을 연도별로 그룹화하여 Contribution 수를 합산 |
| `Current Streak` | 최근 활동 기준 | 일별 Contribution 여부를 기준으로 현재 연속 활동 기간을 계산 |
| `Longest Streak` | 전체 기간 | 전체 Contribution 기록에서 연속으로 Contribution이 발생한 가장 긴 기간을 계산 |
| `Total Contributions` | 전체 기간 | 전체 Contribution 기록의 Contribution 수를 합산 |

### Repository
| 항목 | 기간 | 대상 | 집계 기준 |
| ------ | ----- | ----- | ------- |
| `Repositories` | 전체 | 사용자 소유 Repository | Repository 수, Star 수, Fork 수를 집계하고 Contribution을 통해 활동한 Repository 수를 별도로 집계 |
| `Top Languages` | 전체 | 사용자 소유의 비 Fork Repository | Repository별 언어 사용량을 합산하여 전체 언어 사용량 대비 비율을 계산하고 상위 언어를 표시 |
| `Active Repository` | 최근 1년 | 활동 기록이 있는 Repository | Repository별 활동량을 계산하고 상위 Repository를 표시       |
| `Repositories Record` | 최근 1년 | 활동량이 높은 Repository | Repository별 활동을 집계하여 Contribution Heatmap 형태로 시각화 |

<br>
<br>

## 5. 사용 기술
### Frontend
| 기술/패키지 | 사용 목적 |
| --- | --- |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) | 컴포넌트 기반 SPA 구조 설계 |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white) | 안정적인 코드 작성 및 유지보수성 향상 |
| ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white) | API 데이터 fetching 및 캐싱 |
| ![Zustand](https://img.shields.io/badge/Zustand-433E38?style=flat-square&logo=zustand&logoColor=white) | 클라이언트 전역 상태 관리 |
| ![ChartJS](https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=chart.js&logoColor=white) | GitHub 데이터를 차트 형태로 시각화 |
| `GitHub GraphQL API` | GitHub 사용자 및 Repository 데이터 조회 |
| `React Router` | 페이지 라우팅 및 404 예외 처리 |

### Styling & UI
| 기술/패키지 | 사용 목적 |
| --- | --- |
| ![tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=white) | 유틸리티 기반 및 반응형 UI 스타일링 |
| ![shadcn/ui](https://img.shields.io/badge/Shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white) | 재사용 가능한 UI 컴포넌트 구성 |
| `lucide-react` | 다양한 인터페이스 아이콘을 React 컴포넌트로 사용 |

### Tooling & Deployment
| 기술/패키지 | 사용 목적 |
| --- | --- |
| ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) | 브랜치 전략 기반 버전 관리 (`main / develop`) |
| ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white) | 원격 저장소 및 배포 소스 관리 |
| ![VScode](https://img.shields.io/badge/VS_Code-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white) | 코드 작성 및 개발 환경 |
| ![vite](https://img.shields.io/badge/vite-646CFF?style=flat-square&logo=vite&logoColor=white) | 빠른 개발 서버 및 빌드 환경 구성 |
| ![express](https://img.shields.io/badge/express-000000?style=flat-square&logo=express&logoColor=white) | 로컬 API 서버 및 GitHub GraphQL 요청 처리 |
| ![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white) | 효율적인 의존성 관리와 빠른 패키지 설치 |
| ![eslint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white) | 코드 품질 및 규칙 일관성 유지 |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) | 자동 빌드 및 배포 환경 제공 |

<br>

## 6. 디렉토리 구조
```bash
📦DevOrbit
 ┣ 📂public
 ┃ ┣ 📂favicon
 ┃ ┃ ┗ 📜DevOrbit.svg
 ┃ ┣ 📂fonts
 ┃ ┃ ┗ 📜PretendardStdVariable.woff2
 ┃ ┣ 📂images
 ┣ 📂server
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜contribution.ts
 ┃ ┃ ┗ 📜repository.ts
 ┃ ┣ 📜contributionHistory.ts
 ┃ ┣ 📜githubUser.ts
 ┃ ┗ 📜index.ts
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📜github.ts
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📜DarkMode.tsx
 ┃ ┃ ┃ ┣ 📜EmptyState.tsx
 ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┣ 📜InfoTooltip.tsx
 ┃ ┃ ┃ ┣ 📜Logo.tsx
 ┃ ┃ ┃ ┣ 📜SearchBar.tsx
 ┃ ┃ ┃ ┣ 📜Starfield.tsx
 ┃ ┃ ┃ ┗ 📜TopBtn.tsx
 ┃ ┃ ┣ 📂dashboard
 ┃ ┃ ┃ ┣ 📂skeleton
 ┃ ┃ ┃ ┃ ┣ 📜ActiveRepoSkeleton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ActivitySkeleton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜LanguageSkeleton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ProfileSkeleton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜RepoRecordSkeleton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜RepoSkeleton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜StreakSkeleton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜TierSkeleton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜TrendSkeleton.tsx
 ┃ ┃ ┃ ┃ ┗ 📜YearlyTrendSkeleton.tsx
 ┃ ┃ ┃ ┣ 📜ActiveRepo.tsx
 ┃ ┃ ┃ ┣ 📜ActivityStats.tsx
 ┃ ┃ ┃ ┣ 📜ContributionStreak.tsx
 ┃ ┃ ┃ ┣ 📜ContributionTrend.tsx
 ┃ ┃ ┃ ┣ 📜DetailSkeleton.tsx
 ┃ ┃ ┃ ┣ 📜GemIcon.tsx
 ┃ ┃ ┃ ┣ 📜LanguageChart.tsx
 ┃ ┃ ┃ ┣ 📜ProfileHeader.tsx
 ┃ ┃ ┃ ┣ 📜RepoStats.tsx
 ┃ ┃ ┃ ┣ 📜ReposRecord.tsx
 ┃ ┃ ┃ ┣ 📜TierBadge.tsx
 ┃ ┃ ┃ ┗ 📜YearlyTrend.tsx
 ┃ ┃ ┗ 📂ui
 ┃ ┃ ┃ ┣ 📂heatmap
 ┃ ┃ ┃ ┃ ┗ 📜calendar-heatmap.tsx
 ┃ ┃ ┃ ┣ 📜button.tsx
 ┃ ┃ ┃ ┣ 📜card.tsx
 ┃ ┃ ┃ ┣ 📜input-group.tsx
 ┃ ┃ ┃ ┣ 📜input.tsx
 ┃ ┃ ┃ ┣ 📜skeleton.tsx
 ┃ ┃ ┃ ┣ 📜tabs.tsx
 ┃ ┃ ┃ ┣ 📜textarea.tsx
 ┃ ┃ ┃ ┗ 📜tooltip.tsx
 ┃ ┣ 📂constants
 ┃ ┃ ┣ 📜LangColors.ts
 ┃ ┃ ┗ 📜TierConfig.ts
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜useGithubUser.ts
 ┃ ┃ ┗ 📜useTitle.ts
 ┃ ┣ 📂lib
 ┃ ┃ ┗ 📜utils.ts
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜Detail.tsx
 ┃ ┃ ┣ 📜Error.tsx
 ┃ ┃ ┣ 📜Home.tsx
 ┃ ┃ ┗ 📜NotFound.tsx
 ┃ ┣ 📂utils
 ┃ ┃ ┗ 📜formatDateRange.ts
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜index.css
 ┃ ┣ 📜main.tsx
 ┃ ┗ 📜queryClient.tsx
 ┣ 📂types
 ┃ ┣ 📜GithubUser.ts
 ┃ ┗ 📜RepositoryRecord.ts
 ┣ 📜.env.local
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜components.json
 ┣ 📜eslint.config.js
 ┣ 📜index.html
 ┣ 📜package.json
 ┣ 📜pnpm-lock.yaml
 ┣ 📜pnpm-workspace.yaml
 ┣ 📜tsconfig.app.json
 ┣ 📜tsconfig.json
 ┣ 📜tsconfig.node.json
 ┗ 📜vite.config.ts
```