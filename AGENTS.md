# Agent Instructions

이 프로젝트의 상세 개발 컨텍스트는 `.codex/` 폴더를 참고한다.

작업 전 반드시 다음 문서를 확인한다.

- `.codex/context.md`
- `.codex/architecture.md`
- `.codex/database.md`
- `.codex/api.md`
- `.codex/rules.md`
- `.codex/roadmap.md`

## Critical Rules

- 코드를 바로 작성하지 않는다.
- 먼저 작업 범위, 구현 방향, 변경 예정 파일을 요약하고 사용자 승인을 받는다.
- 승인 후에만 코드를 작성한다.
- `any` 타입은 지양한다.
- 작성 완료 전 `yarn lint`, `yarn build` 기준으로 문제가 없을지 자체 점검한다.