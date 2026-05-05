# API 응답 Helper 구성

## 정리된 프롬프트

클라이언트 API 연결 과정에서 공통 응답 타입과 에러 타입을 정리한다. 도메인 API 파일마다 `ApiSuccessResponse<T>`를 반복해서 쓰지 않도록 Axios 공통 모듈에 응답 타입과 helper 함수를 함께 둔다.

## 작업 의도

- REST API 응답 구조를 공통 타입으로 관리한다.
- 도메인 API 함수에서는 실제 데이터 타입만 드러나도록 호출 코드를 단순화한다.
- 활동 API 타입의 오타와 실제 응답 구조 불일치를 함께 정리한다.

## 작업 범위

- Axios 공통 모듈에 성공/에러 응답 타입 추가
- `apiGet`, `apiPost` helper 추가
- 활동 API 함수에서 helper 사용
- 활동 도메인 타입의 필드명과 타입 정리

## 변경한 파일

- `app/lib/axios.ts`
- `app/domain/activities/api/activities.api.ts`
- `app/domain/activities/types.ts`

## 검증 결과

- `yarn build` 통과
- `yarn eslint app/lib/axios.ts app/domain/activities/api/activities.api.ts app/domain/activities/types.ts` 통과

## 후속 작업

- 다른 도메인 API를 추가할 때 같은 `apiGet`, `apiPost` helper를 사용한다.
- 필요해지면 `apiPut`, `apiPatch`, `apiDelete` helper를 같은 방식으로 확장한다.
