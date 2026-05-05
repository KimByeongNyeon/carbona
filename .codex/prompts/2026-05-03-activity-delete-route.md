# Activity 삭제 Route 연결

## 정리된 프롬프트

활동 데이터 조회와 생성 흐름이 준비된 상태에서 DELETE API를 먼저 서버 route에 연결한다. 삭제 요청의 id를 검증하고, service 계층의 삭제 로직을 호출해 일관된 JSON 응답을 반환하도록 구성한다.

## 작업 의도

- `DELETE /api/activities?id=...` 요청으로 활동 데이터를 삭제할 수 있게 한다.
- 삭제 id는 Zod schema로 검증한다.
- 존재하지 않는 활동 데이터는 service의 도메인 에러를 통해 404로 응답한다.
- 예상하지 못한 삭제 실패만 500으로 응답한다.

## 작업 범위

- 삭제 요청 id 검증 schema 추가
- activities route에 DELETE handler 연결
- 기존 `deleteActivity` service 재사용
- 클라이언트 API와 hook은 이번 범위에서 수정하지 않음

## 변경한 파일

- `app/domain/activities/schemas/activity.schema.ts`
- `app/api/activities/route.ts`

## 검증 결과

- `yarn build` 통과
- `yarn eslint app/api/activities/route.ts app/domain/activities/schemas/activity.schema.ts app/domain/activities/services/activity.service.ts` 통과
- `yarn lint`는 기존 `app/generated/prisma/**` 생성 코드가 검사 대상에 포함되어 실패

## 후속 작업

- 클라이언트 API에 DELETE helper와 activity 삭제 함수를 연결한다.
- 삭제 mutation hook을 추가하고 `activities`, `dashboard` query invalidation을 처리한다.
- 전체 lint 통과를 위해 generated Prisma Client 폴더 처리 방식을 정리한다.
