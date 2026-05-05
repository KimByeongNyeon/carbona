# Prisma 배출계수 Seed 데이터 구성

## 정리된 프롬프트

탄소 배출량 계산에 사용할 기본 배출계수 데이터를 Prisma seed로 등록한다. 전기, 원소재, 운송 카테고리에 대한 초기 데이터를 준비해 개발 환경에서 바로 사용할 수 있도록 구성한다.

## 작업 의도

- `EmissionFactor` 테이블에 기본 배출계수 3건을 넣는다.
- Prisma 7 환경에 맞춰 `PrismaPg` adapter 기반으로 seed 파일을 정리한다.
- 빌드 단계에서 깨지던 미완성 seed 코드를 정상 TypeScript 코드로 교체한다.

## 작업 범위

- `한국전력` 전기 배출계수 추가
- `플라스틱` 원소재 배출계수 추가
- `트럭 운송` 운송 배출계수 추가
- seed 실행 시 기존 배출계수를 지우고 초기 데이터를 다시 넣도록 구성

## 변경한 파일

- `prisma/seed.ts`

## 주요 데이터

```ts
[
  {
    name: "한국전력",
    category: ActivityCategory.ELECTRICITY,
    unit: "kWh",
    factor: 0.456,
    factorUnit: "kgCO2e/kWh",
  },
  {
    name: "플라스틱",
    category: ActivityCategory.MATERIAL,
    unit: "kg",
    factor: 2.3,
    factorUnit: "kgCO2e/kg",
  },
  {
    name: "트럭 운송",
    category: ActivityCategory.TRANSPORT,
    unit: "ton-km",
    factor: 3.5,
    factorUnit: "kgCO2e/ton-km",
  },
]
```

## 검증 결과

- `yarn build` 통과
- `yarn lint`는 기존 `app/generated/prisma/**` 생성 코드가 검사 대상에 포함되어 실패

## 후속 작업

- `package.json`에 Prisma seed 실행 스크립트를 추가할 수 있다.
- `app/generated/prisma/**` 생성 코드를 사용하지 않는다면 삭제하거나 ESLint ignore 대상에 추가할 수 있다.
- Postgres 컨테이너 실행 후 실제 seed 실행을 확인할 수 있다.
