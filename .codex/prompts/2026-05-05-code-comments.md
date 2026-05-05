# 프로젝트 내부 함수 주석 정리

## 정리된 프롬프트

프로젝트 내부 함수에 상세한 주석을 추가하되, 모든 주석은 한국어로 작성한다. 단순히 코드가 하는 일을 반복하기보다 계산 기준, 데이터 흐름, 예외 처리 의도, 유지보수 시 주의해야 할 규칙을 중심으로 설명한다.

## 작업 의도

- 서비스/유틸/훅의 역할과 책임을 더 빠르게 이해할 수 있게 한다.
- 대시보드 월별 집계, Excel 파싱, 배출계수 검증처럼 헷갈리기 쉬운 로직의 의도를 코드 근처에 남긴다.
- 프로젝트의 한국어 맥락에 맞춰 주석 언어를 통일한다.

## 작업 범위

- 활동 데이터 서비스와 유틸 함수 주석 추가
- 배출계수 서비스와 필터 유틸 주석 추가
- 목표 서비스와 상태 계산 유틸 주석 추가
- 대시보드 집계 서비스, 화면 훅, 표시 유틸 주석 추가
- Excel 미리보기/import 서비스, 화면 훅, 표시 유틸 주석 추가
- 공통 API 에러 처리와 Zod form resolver 주석 추가

## 변경한 파일

- `app/domain/activities/services/activity.service.ts`
- `app/domain/activities/utils/activity.utils.ts`
- `app/domain/activities/hooks/useActivityForm.ts`
- `app/domain/dashboard/services/dashboard.service.ts`
- `app/domain/dashboard/hooks/useDashboardPage.ts`
- `app/domain/dashboard/utils/dashboard.utils.ts`
- `app/domain/emission-factors/service/emissionFactor.service.ts`
- `app/domain/emission-factors/utils/emissionFactor.utils.ts`
- `app/domain/excel/services/excelPreview.service.ts`
- `app/domain/excel/services/excelImport.service.ts`
- `app/domain/excel/hooks/useExcelPage.ts`
- `app/domain/excel/utils/excel.util.ts`
- `app/domain/targets/services/target.service.ts`
- `app/domain/targets/utils/target.utils.ts`
- `app/shared/utils/apiError.utils.ts`
- `app/shared/utils/zodFormResolver.ts`

## 검증 결과

- 주석 텍스트를 확인해 새로 추가한 주석을 한국어로 통일
- 변경 파일 기준 ESLint 통과
- `tsc --noEmit --pretty false` 통과
- `next build --webpack` 통과

## 후속 작업

- generated Prisma 산출물을 ESLint 제외 대상으로 분리하면 전체 lint 기준을 더 안정적으로 사용할 수 있다.
