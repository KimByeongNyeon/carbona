# 대시보드 기준월 필터 연동

## 정리된 프롬프트

대시보드 상단의 기준월 선택이 `2026.05`로 고정되어 있어 실제 데이터 월을 선택할 수 없고, 전월 대비 증감률도 화면 기준과 맞지 않는 문제를 해결한다.

## 작업 의도

- 대시보드 API가 기준월과 기간을 query parameter로 받아 실제 선택값에 맞는 데이터를 반환하게 한다.
- 기본 기준월은 현재 날짜가 아니라 활동 데이터가 있는 가장 최신 월로 잡는다.
- KPI와 카테고리 비중은 선택 월 기준으로 계산한다.
- 전월 대비 증감률은 선택 월과 직전 월을 비교한다.
- 월별 차트는 선택 월을 포함한 최근 N개월을 보여준다.
- 목표 대비 현황도 선택 월 기준 target을 조회하게 한다.

## 작업 범위

- Dashboard request params 타입 추가
- Dashboard response에 `availableMonths`, `selectedPeriod`, `period` 추가
- Dashboard service를 선택 월/기간 기준 계산으로 변경
- Dashboard API route에서 `year`, `month`, `period` query parameter 처리
- Dashboard client API와 query key에 params 반영
- Dashboard page hook에 기준월/기간 상태 추가
- Dashboard page 상단 select를 실제 API 응답 기반으로 연결

## 변경한 파일

- `app/api/dashboard/route.ts`
- `app/domain/dashboard/api/dashboard.api.ts`
- `app/domain/dashboard/hooks/useDashboardQuery.ts`
- `app/domain/dashboard/hooks/useDashboardPage.ts`
- `app/domain/dashboard/services/dashboard.service.ts`
- `app/domain/dashboard/types.ts`
- `app/domain/dashboard/components/DashboardPage.tsx`
- `app/domain/dashboard/utils/dashboard.utils.ts`

## 검증 결과

- 대시보드 관련 파일 ESLint 통과
- `./node_modules/.bin/tsc --noEmit --pretty false` 통과
- `./node_modules/.bin/next build --webpack` 통과
- 전체 `yarn lint`는 기존 `app/generated/prisma/**` 생성 코드가 검사 대상에 포함되어 실패

## 후속 작업

- 브라우저에서 기준월 select에 실제 데이터 월이 표시되는지 확인한다.
- 월 변경 시 KPI, 도넛, 라인 차트, 목표 대비 카드가 같이 갱신되는지 확인한다.
