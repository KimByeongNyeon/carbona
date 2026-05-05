# Docker Compose Next.js 앱 서비스 추가

## 정리된 프롬프트

기존 PostgreSQL만 실행하던 Docker Compose 구성에 Next.js 앱도 함께 올라가도록 설정한다. Compose 내부 네트워크에서 앱이 PostgreSQL에 접속할 수 있도록 `DATABASE_URL`을 조정하고, production 빌드된 Next.js 앱을 3000 포트로 실행한다.

## 작업 의도

- `docker compose up`으로 DB와 Next.js 앱을 함께 실행할 수 있게 한다.
- 컨테이너 내부에서는 DB host가 `localhost`가 아니라 `postgres`임을 반영한다.
- fresh DB에서도 테이블이 없어서 API가 바로 실패하지 않도록 앱 시작 전에 Prisma schema를 반영한다.

## 작업 범위

- Next.js 앱용 `Dockerfile` 추가
- Docker 빌드 컨텍스트를 줄이기 위한 `.dockerignore` 추가
- `docker-compose.yml`에 `next-app` 서비스 추가
- PostgreSQL healthcheck 추가
- 앱 컨테이너 시작 시 `prisma db push` 후 `next start` 실행
- Docker 이미지 빌드와 compose 실행 상태 확인

## 변경한 파일

- `Dockerfile`
- `.dockerignore`
- `docker-compose.yml`

## 검증 결과

- `docker compose config` 통과
- `tsc --noEmit --pretty false` 통과
- `next build --webpack` 통과
- `docker compose build next-app` 성공
- `docker compose up -d next-app` 성공
- `docker compose ps`에서 `carbona-postgres`, `carbona-next` 실행 확인
- `curl -I http://127.0.0.1:3000` 200 OK 확인
- 전체 `yarn lint`는 generated Prisma 산출물의 기존 lint 이슈로 실패

## 후속 작업

- seed 데이터까지 자동으로 넣고 싶다면 별도 one-shot seed service를 분리하는 편이 안전하다.
- 실제 배포 환경에서는 `prisma db push` 대신 migration 파일을 생성하고 `prisma migrate deploy`로 전환하는 것이 더 적합하다.
