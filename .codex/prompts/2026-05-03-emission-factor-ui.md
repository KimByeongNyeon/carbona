# 배출계수 관리 UI 구성

## 정리된 프롬프트

기존에 구현된 배출계수 조회, 생성, 수정, 비활성화 로직을 바탕으로 예시 이미지의 `배출계수 관리` 화면과 유사한 UI/UX를 구성한다. 공통 dashboard layout을 유지하면서 배출계수 전용 페이지, 테이블, 생성 폼을 추가한다.

## 작업 의도

- `/emission-factors` 페이지를 실제 화면으로 연결한다.
- 예시 이미지처럼 상단 제목, 탭, 추가 버튼, 요약 카드, 필터 바, 테이블을 제공한다.
- 컴포넌트 내부에 비즈니스 로직이 쌓이지 않도록 constants, utils, hook으로 분리한다.
- API 경로와 타입 오타를 정리해 클라이언트 호출이 실제 route와 맞게 동작하도록 한다.

## 작업 범위

- 배출계수 page route 추가
- 배출계수 관리 페이지 컴포넌트 추가
- 배출계수 생성 폼 추가
- 배출계수 테이블 추가
- 배출계수 화면 전용 hook 추가
- 배출계수 constants/utils 추가
- 배출계수 API 경로와 타입 정리

## 변경한 파일

- `app/(dashboard)/emission-factors/page.tsx`
- `app/(dashboard)/emission-factors/.gitkeep`
- `app/domain/emission-factors/components/EmissionFactorPage.tsx`
- `app/domain/emission-factors/components/EmissionFactorTable.tsx`
- `app/domain/emission-factors/components/EmissionFactorCreateForm.tsx`
- `app/domain/emission-factors/hooks/useEmissionFactorPage.ts`
- `app/domain/emission-factors/hooks/useEmissionFactorQuery.ts`
- `app/domain/emission-factors/constants/emissionFactor.constants.ts`
- `app/domain/emission-factors/utils/emissionFactor.utils.ts`
- `app/domain/emission-factors/api/emission-factors.api.ts`
- `app/domain/emission-factors/types.ts`
- `app/domain/emission-factors/schemas/emissionFactor.schema.ts`

## 검증 결과

- 배출계수 UI 관련 파일 ESLint 통과
- `./node_modules/.bin/next build --webpack` 통과
- 전체 `yarn lint`는 기존 `app/generated/prisma/**` 생성 코드가 검사 대상에 포함되어 실패

## 후속 작업

- 수정 버튼에 실제 편집 UI를 연결한다.
- 브라우저에서 `/emission-factors` 화면을 열어 생성과 비활성화 흐름을 확인한다.
- 전체 lint 통과를 위해 generated Prisma Client 폴더 처리 방식을 정리한다.
