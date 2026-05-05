# README 문서 작성

## 정리된 프롬프트

`.codex/manual.md`의 제출 요구사항을 참고해 프로젝트 README를 상세하게 작성한다. 이모티콘은 사용하지 않고, 일반 로컬 실행 방식과 Docker 실행 방식을 모두 포함한다. 프로젝트 설명, 설계 내용, trade-off, 향후 개선 방향, AI 활용 내역을 읽기 쉽게 정리한다.

## 작업 의도

- 기본 Next.js README를 실제 프로젝트 제출 문서로 교체
- 비전문가도 프로젝트 목적과 실행 방법을 이해할 수 있게 정리
- PCF, GHG Scope, 배출계수 기반 계산 흐름을 설명
- 설계 결정과 trade-off를 명확히 문서화

## 작업 범위

- 프로젝트 개요와 목적 작성
- 핵심 기능 설명 작성
- 탄소 회계 개념 반영 내용 작성
- 기술 스택과 아키텍처 작성
- 일반 실행 방법과 Docker 실행 방법 작성
- 데이터베이스 모델과 주요 API 작성
- 주요 설계 결정, trade-off, 향후 개선 방향 작성
- 검증 기준과 AI 활용 내역 작성

## 변경한 파일

- `README.md`

## 검증 결과

- README 내 이모티콘 검색 결과 없음
- `next build --webpack` 통과
- 전체 `yarn lint`는 generated Prisma 산출물의 기존 lint 이슈로 실패

## 후속 작업

- `app/generated/prisma/**`를 ESLint 제외 대상으로 분리하면 전체 lint 기준을 README 내용과 맞출 수 있다.
- 실제 제출 전 Docker volume을 초기화한 fresh 환경에서 README 실행 순서를 한 번 더 확인하면 좋다.
