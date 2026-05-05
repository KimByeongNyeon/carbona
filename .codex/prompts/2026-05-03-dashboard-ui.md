# 대시보드 UI 구성

## 정리된 프롬프트

대시보드 API와 Query 구현이 완료된 상태에서 참고 이미지의 대시보드 화면과 유사한 UI/UX를 구성한다. 통합 dashboard API 응답을 기반으로 KPI 카드, 월별 추이 차트, 카테고리 비중 차트, 최근 활동 데이터, 목표 대비 카드 등을 렌더링한다.

## 작업 의도

- `/dashboard` 페이지를 실제 대시보드 화면으로 연결한다.
- 대시보드 Query가 API 함수를 제대로 실행하도록 수정한다.
- service 응답 필드 오타와 타입 불일치를 바로잡는다.
- 컴포넌트 내부에 데이터 변환 로직을 두지 않고 constants, utils, hook으로 분리한다.

## 작업 범위

- 대시보드 page route 추가
- 대시보드 화면 컴포넌트 추가
- KPI 카드 컴포넌트 추가
- 월별 추이 라인 차트 추가
- 카테고리 비중 도넛 차트 추가
- 최근 활동 데이터 테이블 추가
- 인사이트/목표 카드 추가
- 대시보드 표시용 constants, utils, hook 추가
- dashboard Query와 service 응답 필드 수정

## 변경한 파일

- `app/(dashboard)/dashboard/page.tsx`
- `app/(dashboard)/dashboard/.gitkeep`
- `app/page.tsx`
- `app/domain/dashboard/components/DashboardPage.tsx`
- `app/domain/dashboard/components/DashboardSummaryCards.tsx`
- `app/domain/dashboard/components/DashboardMonthlyChart.tsx`
- `app/domain/dashboard/components/DashboardCategoryChart.tsx`
- `app/domain/dashboard/components/DashboardRecentActivities.tsx`
- `app/domain/dashboard/components/DashboardInsightCards.tsx`
- `app/domain/dashboard/hooks/useDashboardPage.ts`
- `app/domain/dashboard/hooks/useDashboardQuery.ts`
- `app/domain/dashboard/constants/dashboard.constants.ts`
- `app/domain/dashboard/utils/dashboard.utils.ts`
- `app/domain/dashboard/services/dashboard.service.ts`
- `app/domain/dashboard/types.ts`

## 검증 결과

- 대시보드 관련 파일 ESLint 통과
- `./node_modules/.bin/next build --webpack` 통과
- 전체 `yarn lint`는 기존 `app/generated/prisma/**` 생성 코드가 검사 대상에 포함되어 실패

## 후속 작업

- 실제 DB 데이터로 `/dashboard` 화면의 차트와 테이블 표시를 브라우저에서 확인한다.
- 목표 설정 API가 준비되면 임시 목표값을 실제 목표 데이터로 교체한다.
- 전체 lint 통과를 위해 generated Prisma Client 폴더 처리 방식을 정리한다.
