# 대시보드 전월 대비 증감률 계산

## 정리된 프롬프트

대시보드 KPI 카드에 표시되는 전월 대비 증감률이 하드코딩되어 있는 문제를 실제 활동 데이터 기반 계산으로 변경한다.

## 작업 의도

- 총 배출량, 전기, 원소재, 운송 KPI 카드의 전월 대비 값을 실제 데이터로 표시한다.
- 데이터에서 가장 최신 월과 그 직전 월을 비교해 과제 데이터처럼 현재 날짜와 다른 기간의 데이터도 자연스럽게 처리한다.
- 전월 데이터가 없는 경우 잘못된 퍼센트 대신 `전월 데이터 없음`으로 표시한다.
- 증가/감소/변동 없음 상태를 시각적으로 구분한다.

## 작업 범위

- Dashboard summary 응답 타입에 증감률 필드 추가
- Dashboard service에서 최신 월/전월 배출량 계산
- 총합 및 카테고리별 증감률 계산
- Dashboard summary card의 하드코딩 trend 제거
- 증감률 formatter 추가

## 변경한 파일

- `app/domain/dashboard/services/dashboard.service.ts`
- `app/domain/dashboard/types.ts`
- `app/domain/dashboard/components/DashboardSummaryCards.tsx`
- `app/domain/dashboard/utils/dashboard.utils.ts`

## 검증 결과

- 대시보드 관련 파일 ESLint 통과
- `./node_modules/.bin/tsc --noEmit --pretty false` 통과
- `./node_modules/.bin/next build --webpack` 통과
- 전체 `yarn lint`는 기존 `app/generated/prisma/**` 생성 코드가 검사 대상에 포함되어 실패

## 후속 작업

- 브라우저에서 Excel Import 후 최신 월과 직전 월 비교 결과가 KPI 카드에 표시되는지 확인한다.
- 필요하면 월 선택 필터를 추가해 특정 기준월 대비 증감률을 볼 수 있게 확장한다.
