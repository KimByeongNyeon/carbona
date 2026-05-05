# Activity 생성 500 에러 원인 진단

## 정리된 프롬프트

활동 데이터 생성 API를 테스트할 때 500 에러가 발생하는 원인을 확인한다. Prisma 싱글톤 연결 이후 `createActivityService`와 API route 흐름을 점검해 실제 실패 가능성이 높은 지점을 정리한다.

## 작업 의도

- `POST /api/activities` 요청이 500으로 응답하는 이유를 파악한다.
- service 내부의 Prisma 조회, 배출계수 검증, 배출량 계산 흐름을 확인한다.
- 코드 변경 전 원인과 수정 방향을 먼저 정리한다.

## 작업 범위

- 활동 생성 route 확인
- 활동 생성 service 확인
- 입력 Zod schema 확인
- Prisma 싱글톤 연결 확인
- 빌드 상태 확인

## 변경한 파일

- `.codex/prompts/2026-05-02-activity-create-500-diagnosis.md`

## 검증 결과

- `yarn build` 통과
- TypeScript 컴파일 문제는 없는 상태
- 500 에러는 런타임에서 service가 던지는 에러가 route의 catch에 의해 500으로 포장되는 구조가 주요 원인으로 확인됨

## 후속 작업

- `createActivityService`의 배출량 계산식을 수정한다.
- 배출계수 없음, 비활성, 카테고리/단위 불일치 같은 도메인 에러를 400 또는 404로 응답하도록 route 에러 처리를 개선한다.
- 실제 DB에 seed 데이터가 들어갔는지 확인한다.
