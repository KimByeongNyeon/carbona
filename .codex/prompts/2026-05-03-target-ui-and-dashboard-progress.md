# 목표 관리 UI 및 대시보드 목표 진행률 연결

## 정리된 프롬프트

목표 설정 기능이 어느 정도 구현된 상태에서 사용자가 언제 목표를 설정하고 확인해야 하는지 자연스러운 흐름을 설계한다. 별도의 목표 관리 화면에서 월별 전체 목표와 카테고리별 목표를 설정하고, 대시보드에서는 현재 월의 전체 목표를 기준으로 목표 대비 진행률과 상태를 확인할 수 있게 한다.

## 작업 의도

- 목표 설정을 활동 입력 흐름에 억지로 끼워 넣지 않고 독립된 관리 화면으로 분리한다.
- 대시보드에서는 사용자가 현재 월 목표 달성 상태를 즉시 확인할 수 있게 한다.
- 목표 데이터 조회와 생성 로직을 Query, API, hook, utils로 분리해 컴포넌트 내부 비즈니스 로직을 줄인다.
- 목표 조회 API의 query parameter를 Zod로 검증해 잘못된 요청을 명확하게 처리한다.

## 작업 범위

- `/targets` 목표 관리 페이지 추가
- 목표 생성 폼 UI 추가
- 설정된 목표 테이블 UI 추가
- 목표 조회/생성 API 클라이언트 추가
- 목표 관리 Query hook 및 페이지 hook 추가
- 목표 표시용 constants, utils, type 추가
- 목표 조회 API의 `year`, `month` 검증 추가
- 사이드바에 목표 관리 메뉴 추가
- 대시보드 목표 대비 현황 카드를 실제 목표 데이터 기반으로 변경

## 변경한 파일

- `app/(dashboard)/targets/page.tsx`
- `app/api/targets/route.ts`
- `app/domain/targets/api/targets.api.ts`
- `app/domain/targets/components/TargetCreateForm.tsx`
- `app/domain/targets/components/TargetPage.tsx`
- `app/domain/targets/components/TargetTable.tsx`
- `app/domain/targets/constants/target.constants.ts`
- `app/domain/targets/hooks/useTargetPage.ts`
- `app/domain/targets/hooks/useTargetQuery.ts`
- `app/domain/targets/schemas/target.schema.ts`
- `app/domain/targets/types.ts`
- `app/domain/targets/utils/target.utils.ts`
- `app/domain/dashboard/components/DashboardInsightCards.tsx`
- `app/domain/dashboard/components/DashboardPage.tsx`
- `app/domain/dashboard/constants/dashboard.constants.ts`
- `app/domain/dashboard/hooks/useDashboardPage.ts`
- `app/domain/dashboard/utils/dashboard.utils.ts`
- `app/shared/constants/navigation.ts`

## 검증 결과

- 목표 관리 및 대시보드 관련 파일 ESLint 통과
- `./node_modules/.bin/next build --webpack` 통과
- 전체 `yarn lint`는 기존 `app/generated/prisma/**` 생성 코드가 검사 대상에 포함되어 실패

## 후속 작업

- 브라우저에서 `/targets` 목표 생성 후 `/dashboard` 목표 대비 현황 카드가 즉시 갱신되는지 확인한다.
- 목표 수정/삭제 기능이 필요하면 같은 화면에서 행 단위 액션으로 확장한다.
- 전체 lint 통과를 위해 generated Prisma Client 폴더를 ESLint 검사 대상에서 제외하는 방식을 검토한다.
