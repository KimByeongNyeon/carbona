# Dashboard Layout 및 Activity 화면 분리

## 정리된 프롬프트

활동 데이터 화면의 UI 컴포넌트가 너무 커진 상태를 개선한다. `TestActivity`라는 임시 이름을 실제 화면 컴포넌트 이름으로 바꾸고, 공통 사이드바와 헤더를 layout group으로 분리한다. 모바일에서는 사이드바를 햄버거 버튼으로 열고 닫을 수 있게 구성한다.

## 작업 의도

- 활동 데이터 화면의 책임을 페이지, 테이블, 폼, 공통 레이아웃으로 분리한다.
- `/activities` 화면이 공통 앱 레이아웃을 사용하도록 route group을 구성한다.
- 데스크톱에서는 고정 사이드바, 모바일에서는 햄버거 버튼 기반 오버레이 사이드바를 제공한다.
- 남아 있던 `TestActivity`, `activites`, `getActivites` 같은 임시 이름과 오타를 정리한다.

## 작업 범위

- `app/(dashboard)/layout.tsx` route group layout 추가
- `AppShell` 공통 레이아웃 컴포넌트 추가
- `ActivityPage`와 `ActivityTable` 컴포넌트 추가
- 기존 `TestActivity` 제거
- `/activities` page를 route group 내부로 이동
- 활동 조회 service 함수명 오타 정리

## 변경한 파일

- `app/(dashboard)/layout.tsx`
- `app/(dashboard)/activities/page.tsx`
- `app/shared/components/AppShell.tsx`
- `app/domain/activities/components/ActivityPage.tsx`
- `app/domain/activities/components/ActivityTable.tsx`
- `app/domain/activities/components/TestActivity.tsx`
- `app/activities/page.tsx`
- `app/api/activities/route.ts`
- `app/domain/activities/services/activity.service.ts`

## 검증 결과

- 변경 관련 파일 ESLint 통과
- `./node_modules/.bin/next build --webpack` 통과
- 기본 `yarn build`는 Turbopack/PostCSS가 sandbox 내부에서 포트 바인딩을 시도하다 권한 문제로 실패했고, 권한 상승 실행은 승인 거절로 진행하지 못했다.

## 후속 작업

- 브라우저에서 `/activities`를 열어 모바일/데스크톱 사이드바 동작을 확인한다.
- 필요하면 Next 빌드가 항상 webpack으로 동작하도록 스크립트를 조정할 수 있다.
- 전체 lint 통과를 위해 generated Prisma Client 폴더 처리 방식을 정리한다.
