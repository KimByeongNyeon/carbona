# Activity 생성 API 에러 응답 세분화

## 정리된 프롬프트

활동 데이터 생성 API에서 service 에러가 모두 500으로 응답되는 문제를 개선한다. 배출계수 조회와 검증 과정에서 발생하는 도메인 에러를 HTTP 상태 코드에 맞게 분리하고, 잘못된 배출량 계산식도 함께 수정한다.

## 작업 의도

- 입력값이나 도메인 검증 문제를 서버 장애처럼 500으로 응답하지 않도록 한다.
- service는 비즈니스 규칙을 판단하고, route는 HTTP 응답 변환만 담당하도록 역할을 나눈다.
- 활동 데이터 저장 시 배출량을 `amount * factor`로 정확히 계산한다.

## 작업 범위

- 활동 생성 service에 status code를 가진 도메인 에러 추가
- 배출계수 없음, 비활성, 카테고리 불일치, 단위 불일치 에러 분리
- POST route에서 `ActivityServiceError`를 구분해 응답 처리
- activity 생성 입력 타입명을 PascalCase로 정리

## 변경한 파일

- `app/domain/activities/schemas/activity.schema.ts`
- `app/domain/activities/services/activity.service.ts`
- `app/api/activities/route.ts`

## 검증 결과

- `yarn build` 통과
- `yarn eslint app/api/activities/route.ts app/domain/activities/services/activity.service.ts app/domain/activities/schemas/activity.schema.ts` 통과
- `yarn lint`는 기존 `app/generated/prisma/**` 생성 코드가 검사 대상에 포함되어 실패

## 후속 작업

- `app/generated/prisma/**` 생성 코드 처리 방식을 정리해 전체 lint가 통과하도록 만든다.
- 실제 DB에 seed 데이터가 들어간 상태에서 `POST /api/activities`를 다시 테스트한다.
