# 배출계수 재활성화 기능 추가

## 정리된 프롬프트

배출계수 관리 화면에서 활성 배출계수는 비활성화할 수 있지만, 비활성화된 배출계수를 다시 적용 상태로 되돌릴 수 없는 문제를 해결한다.

## 작업 의도

- 비활성 배출계수를 다시 활성화할 수 있게 한다.
- 재활성화 시 동일한 이름, 카테고리, 단위의 다른 활성 배출계수가 있으면 중복 활성화를 막는다.
- 상태 변경 후 배출계수 목록, 활동 데이터, 대시보드가 다시 조회되도록 한다.

## 작업 범위

- 배출계수 update service에 재활성화 중복 검증 추가
- 배출계수 활성/비활성 토글 mutation 추가
- 배출계수 페이지 hook의 상태 변경 핸들러 수정
- 테이블 전원 버튼을 활성 상태에 따라 비활성화/재활성화로 동작하도록 변경
- 사용하지 않는 navigation icon import 정리

## 변경한 파일

- `app/domain/emission-factors/service/emissionFactor.service.ts`
- `app/domain/emission-factors/hooks/useEmissionFactorQuery.ts`
- `app/domain/emission-factors/hooks/useEmissionFactorPage.ts`
- `app/domain/emission-factors/components/EmissionFactorPage.tsx`
- `app/domain/emission-factors/components/EmissionFactorTable.tsx`
- `app/shared/constants/navigation.ts`

## 검증 결과

- 배출계수 관련 파일 ESLint 통과
- `./node_modules/.bin/tsc --noEmit --pretty false` 통과
- `./node_modules/.bin/next build --webpack` 통과
- 전체 `yarn lint`는 기존 `app/generated/prisma/**` 생성 코드가 검사 대상에 포함되어 실패

## 후속 작업

- 브라우저에서 배출계수 상태 필터를 `비활성`으로 바꾼 뒤 재활성화 버튼 동작을 확인한다.
- 상태 변경 액션에 확인 모달이나 toast 피드백을 추가하면 사용성이 더 좋아진다.
