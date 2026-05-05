 Development Rules

## 1. 작업 방식

코드를 바로 작성하지 않는다.

반드시 아래 순서를 따른다.

1. 작업 범위 요약
2. 구현 방향 설명
3. 변경 예정 파일 목록 제시
4. 사용자 승인 요청
5. 승인 후 코드 작성

---

## 2. 코드 작성 규칙

- TypeScript를 사용한다.
- any 타입 사용을 지양한다.
- 명확한 타입을 정의한다.
- API 요청/응답 타입을 반드시 정의한다.
- Zod를 사용하여 입력값을 검증한다.

---

## 3. 구조 규칙

도메인 기반 구조를 따른다.

domain/
  activities/
  emission-factors/
  dashboard/
  targets/
  excel/

각 도메인은 다음 구조를 가진다.

api/
hooks/
services/
type.ts

## 4. 역할 분리
UI 컴포넌트: 화면 렌더링
hooks: 상태 관리 및 Query
services: 비즈니스 로직
api: HTTP 요청

## 5. TanStack Query 규칙
queryKey는 명확하게 정의한다
mutation 이후 반드시 invalidate 처리한다
queryClient.invalidateQueries({ queryKey: ['activities'] })
queryClient.invalidateQueries({ queryKey: ['dashboard'] })

## 6. Prisma 규칙
schema 변경 시 migrate 사용
DB 직접 수정 금지

## 7. 코드 품질

코드 작성 완료 전 반드시 확인한다.

ESLint 에러 없음
TypeScript 에러 없음
런타임 에러 가능성 없음

## 8. 금지 사항
any 남용 금지
컴포넌트 내부에 비즈니스 로직 작성 금지
API Route에 복잡한 로직 직접 작성 금지

## 9. 중요 원칙
로직은 재사용 가능하게 작성한다
중복 코드는 service로 분리한다
명확한 네이밍을 사용한다

## 10. 프롬프트 기록

작업이 끝나면 사용자가 작성한 프롬프트를 `.codex/prompts/` 폴더에 작업 기록 형태로 정리해서 기록한다.

사용자의 문장을 그대로 복사하지 않고, 요청 의도와 맥락이 잘 드러나도록 자연스럽게 다듬어 작성한다.

기록 시 다음 내용을 포함한다.

- 정리된 프롬프트
- 작업 의도
- 작업 범위
- 변경한 파일
- 검증 결과
- 후속 작업
