# 컴포넌트 비즈니스 로직 분리

## 정리된 프롬프트

컴포넌트 내부에 남아 있는 비즈니스 로직을 제거하고, hooks, utils, constants로 책임을 분리한다. 컴포넌트는 렌더링과 사용자 이벤트 연결에 집중하도록 정리한다.

## 작업 의도

- 활동 데이터 정렬, 날짜 포맷, 카테고리 라벨/스타일, 배출계수 프리셋, 배출량 계산 로직을 컴포넌트 밖으로 이동한다.
- 폼 상태에서 파생되는 계산과 프리셋 적용 로직은 전용 hook으로 분리한다.
- 공통 사이드바의 navigation 데이터도 constants로 분리한다.

## 작업 범위

- activity constants 추가
- activity utils 추가
- activity form 전용 hook 추가
- activity page 전용 hook 추가
- ActivityPage, ActivityTable, ActivityCreateForm에서 직접 처리하던 로직 제거
- AppSidebar navigation 데이터 분리

## 변경한 파일

- `app/domain/activities/constants/activity.constants.ts`
- `app/domain/activities/utils/activity.utils.ts`
- `app/domain/activities/hooks/useActivityForm.ts`
- `app/domain/activities/hooks/useActivityPage.ts`
- `app/domain/activities/components/ActivityPage.tsx`
- `app/domain/activities/components/ActivityTable.tsx`
- `app/domain/activities/components/ActivityCreateForm.tsx`
- `app/shared/constants/navigation.ts`
- `app/shared/components/AppSidebar.tsx`

## 검증 결과

- 변경 관련 파일 ESLint 통과
- `./node_modules/.bin/next build --webpack` 통과

## 후속 작업

- 필요하면 공통 UI class 문자열도 design token 또는 shared UI 컴포넌트로 분리한다.
- 전체 lint 통과를 위해 generated Prisma Client 폴더 처리 방식을 정리한다.
