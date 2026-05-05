# Prisma 싱글톤 유틸 추가

## 정리된 프롬프트

활동 데이터 생성 서비스에서 Prisma를 안정적으로 사용할 수 있도록 공용 Prisma Client 싱글톤을 추가한다. Next.js 개발 환경의 hot reload 상황에서도 Prisma Client가 반복 생성되지 않도록 별도 유틸 파일로 관리한다.

## 작업 의도

- service 계층에서 공통으로 import할 수 있는 Prisma 접근 지점을 만든다.
- Prisma 7 환경에 맞춰 `@prisma/adapter-pg`의 `PrismaPg` adapter를 사용한다.
- `any` 없이 `globalThis` 타입을 확장해 개발 환경 캐싱을 처리한다.

## 작업 범위

- `app/lib/prisma.ts` 파일 추가
- `DATABASE_URL` 누락 시 명확한 에러 처리
- 개발 환경에서 `globalThis` 기반 Prisma Client 재사용 처리
- 활동 service와 API route는 아직 수정하지 않음

## 변경한 파일

- `app/lib/prisma.ts`

## 검증 결과

- `yarn eslint app/lib/prisma.ts` 통과
- `yarn build`는 기존 `app/api/activities/route.ts`의 미완성 `getActivites` 참조 때문에 실패
- `yarn lint`는 기존 `app/generated/prisma/**` 생성 코드가 검사 대상에 포함되어 실패

## 후속 작업

- `createActivityService`에서 `import { prisma } from "@/app/lib/prisma"` 형태로 싱글톤을 사용한다.
- `app/api/activities/route.ts`의 미완성 import와 함수명을 정리한다.
- `app/generated/prisma/**` 처리 방식을 정리해 전체 lint가 통과하도록 만든다.
