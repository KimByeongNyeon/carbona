# 잘못된 데이터 입력 UI 피드백

## 정리된 프롬프트

사용자가 수동 입력 폼에서 잘못된 값을 입력했을 때 즉시 이해할 수 있는 UI 피드백을 제공한다. 활동 데이터, 배출계수, 목표 설정 폼에 클라이언트 검증을 연결하고, 서버 저장 실패 메시지도 화면에서 확인할 수 있도록 정리한다.

## 작업 의도

- 잘못된 데이터 입력 시 500 오류나 조용한 실패처럼 보이지 않게 개선
- 필드별 오류 메시지와 상단 오류 알림을 함께 제공
- 기존 Zod 스키마를 React Hook Form 검증 흐름과 연결
- API 실패 메시지를 사용자에게 자연스럽게 노출

## 작업 범위

- 공통 Zod form resolver 추가
- 공통 API 에러 메시지 추출 유틸 추가
- 활동 데이터 입력 폼 검증 피드백 적용
- 배출계수 추가 폼 검증 피드백 적용
- 목표 설정 폼 검증 피드백 적용
- 스키마 오류 메시지를 한국어로 정리

## 변경한 파일

- `app/shared/utils/zodFormResolver.ts`
- `app/shared/utils/apiError.utils.ts`
- `app/domain/activities/schemas/activity.schema.ts`
- `app/domain/activities/components/ActivityCreateForm.tsx`
- `app/domain/activities/hooks/useActivity.ts`
- `app/domain/emission-factors/components/EmissionFactorCreateForm.tsx`
- `app/domain/emission-factors/components/EmissionFactorPage.tsx`
- `app/domain/emission-factors/hooks/useEmissionFactorPage.ts`
- `app/domain/targets/schemas/target.schema.ts`
- `app/domain/targets/components/TargetCreateForm.tsx`
- `app/domain/targets/components/TargetPage.tsx`
- `app/domain/targets/hooks/useTargetPage.ts`

## 검증 결과

- 변경 파일 기준 ESLint 통과
- `tsc --noEmit --pretty false` 통과
- `next build --webpack` 통과
- 전체 `yarn lint`는 generated Prisma 산출물의 기존 lint 이슈로 실패

## 후속 작업

- Excel 미리보기 테이블의 행 단위 오류도 동일한 스타일의 피드백 컴포넌트로 맞추면 화면 전체의 일관성이 더 좋아진다.
- generated Prisma 폴더를 ESLint 제외 대상으로 분리하면 전체 lint 기준을 안정적으로 사용할 수 있다.
