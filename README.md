# DevOrbit 📡

## 1. 프로젝트 소개 & 기획 의도
- GitHub 활동과 기술 스택을 시각적으로 보여주는 대시보드
- shadcn/ui, Chart.js, pnpm 학습

<br>

## 2. 개발 기간 & 단계
- **기간**: 2026.09 ~
- **개발 단계**:
  - Phase 1. 프로젝트 초기 세팅 & 디자인 시스템 설계
  - Phase 2. GitHub API 연동
  - Phase 3. 데이터 가공 및 차트 구현
  - Phase 4. UI/UX 개선 및 반응형 대응
  - Phase 5. 성능 최적화 및 배포

<br>

## 3. 주요 기능 및 페이지 구성
### Home
* GitHub GraphQL API를 활용한 username 검색
* 검색 결과에 따른 Detail 페이지 이동
* 잘못된 username 입력 및 GitHub 사용자 조회 오류 처리

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
* 존재하지 않는 경로 접근 시 404 페이지 제공
* 잘못된 URL 접근에 대한 예외 처리

<br>

## 4. 사용 기술 스택

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

## 5. 디렉토리 구조
```bash
📦DevOrbit
 ┣ 📂public
 ┃ ┣ 📂favicon
 ┃ ┃ ┗ 📜DevOrbit.svg
 ┃ ┣ 📂fonts
 ┃ ┃ ┗ 📜PretendardStdVariable.woff2
 ┣ 📂server
 ┃ ┗ 📜github.ts
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📜github.ts
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📜DarkMode.tsx
 ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┣ 📜InfoTooltip.tsx
 ┃ ┃ ┃ ┣ 📜Logo.tsx
 ┃ ┃ ┃ ┣ 📜SearchBar.tsx
 ┃ ┃ ┃ ┗ 📜Starfield.tsx
 ┃ ┃ ┣ 📂dashboard
 ┃ ┃ ┃ ┣ 📂skeleton
 ┃ ┃ ┃ ┃ ┣ 📜ActiveRepoSkeleton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ActivitySkeleton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜LanguageSkeleton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ProfileSkeleton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜RepoSkeleton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜StreakSkeleton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜TierSkeleton.tsx
 ┃ ┃ ┃ ┃ ┗ 📜TrendSkeleton.tsx
 ┃ ┃ ┃ ┣ 📜ActiveRepo.tsx
 ┃ ┃ ┃ ┣ 📜ActivityStats.tsx
 ┃ ┃ ┃ ┣ 📜ContributionStreak.tsx
 ┃ ┃ ┃ ┣ 📜ContributionTrend.tsx
 ┃ ┃ ┃ ┣ 📜DetailSkeleton.tsx
 ┃ ┃ ┃ ┣ 📜LanguageChart.tsx
 ┃ ┃ ┃ ┣ 📜ProfileHeader.tsx
 ┃ ┃ ┃ ┣ 📜RepoStats.tsx
 ┃ ┃ ┃ ┗ 📜TierBadge.tsx
 ┃ ┃ ┗ 📂ui
 ┃ ┃ ┃ ┣ 📜button.tsx
 ┃ ┃ ┃ ┣ 📜card.tsx
 ┃ ┃ ┃ ┣ 📜input-group.tsx
 ┃ ┃ ┃ ┣ 📜input.tsx
 ┃ ┃ ┃ ┣ 📜skeleton.tsx
 ┃ ┃ ┃ ┣ 📜textarea.tsx
 ┃ ┃ ┃ ┗ 📜tooltip.tsx
 ┃ ┣ 📂constants
 ┃ ┃ ┣ 📜LangColors.ts
 ┃ ┃ ┗ 📜TierConfig.ts
 ┃ ┣ 📂hooks
 ┃ ┃ ┗ 📜useGithubUser.ts
 ┃ ┣ 📂lib
 ┃ ┃ ┗ 📜utils.ts
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜Detail.tsx
 ┃ ┃ ┣ 📜Error.tsx
 ┃ ┃ ┣ 📜Home.tsx
 ┃ ┃ ┗ 📜NotFound.tsx
 ┃ ┣ 📂types
 ┃ ┃ ┗ 📜GithubUser.ts
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜index.css
 ┃ ┣ 📜main.tsx
 ┃ ┗ 📜queryClient.tsx
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