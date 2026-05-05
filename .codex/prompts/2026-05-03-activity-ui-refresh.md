# Activity 화면 UI 개편

## 정리된 프롬프트

조회, 생성, 삭제 API가 연결된 활동 데이터 화면을 예시 이미지와 유사한 운영툴 UI로 개편한다. 기존 오타 라우트를 정리하고, 사이드바와 헤더를 포함한 데이터 입력/관리 화면을 완성도 있게 구성한다.

## 작업 의도

- `/activites` 오타 라우트를 `/activities`로 바로잡는다.
- 예시 이미지의 PCF 관리 플랫폼 톤에 맞춰 사이드바, 헤더, 입력 폼, 계산 결과 카드, 목록 테이블을 구성한다.
- 생성과 삭제가 UI에서 자연스럽게 동작하도록 클라이언트 API와 mutation 흐름을 정리한다.

## 작업 범위

- 활동 데이터 페이지 라우트 정리
- 좌측 사이드바와 상단 헤더 추가
- 활동 데이터 입력 폼 디자인 개편
- 배출량 계산 결과 카드 추가
- 최근 활동 데이터 테이블 추가
- 테이블 삭제 액션 연결
- activity query key와 API delete 경로 정리

## 변경한 파일

- `app/activities/page.tsx`
- `app/activites/page.tsx`
- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `app/domain/activities/components/TestActivity.tsx`
- `app/domain/activities/components/ActivityCreateForm.tsx`
- `app/domain/activities/hooks/useActivity.ts`
- `app/domain/activities/hooks/useActivityQuery.ts`
- `app/domain/activities/api/activities.api.ts`
- `app/domain/activities/schemas/activity.schema.ts`

## 검증 결과

- `yarn build` 통과
- 변경 관련 파일 대상 ESLint 통과
- dev 서버 실행은 로컬 포트 바인딩 권한 승인 단계에서 거절되어 실행하지 못했다.

## 후속 작업

- 브라우저에서 `/activities` 화면을 열어 실제 데이터 생성과 삭제 흐름을 확인한다.
- 전체 lint 통과를 위해 `app/generated/prisma/**` 생성 코드 처리 방식을 정리한다.
