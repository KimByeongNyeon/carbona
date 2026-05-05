# Architecture

## 전체 구조

도메인 기반 아키텍처를 따른다.

---

## 폴더 구조

```txt
src/
  app/
    api/
      dashboard/
      activities/
      emission-factors/
      targets/
      excel/

  domain/
    activities/
      api/
      hooks/
      services/
      type.ts

    emission-factors/
      api/
      hooks/
      services/
      type.ts

    dashboard/
      api/
      hooks/
      services/
      type.ts

    targets/
      api/
      hooks/
      services/
      type.ts

    excel/
      api/
      hooks/
      services/
      type.ts

  shared/
    lib/
    utils/
    constants/
    components/
```

## 계층 구조

```txt
UI (Component)
↓
Hooks (React Query)
↓
API (HTTP 요청)
↓
Next.js API Route
↓
Service (비즈니스 로직)
↓
Prisma
↓
PostgreSQL
```

## 데이터 흐름

```txt
사용자 입력
→ React Hook Form
→ Mutation (React Query)
→ API Route
→ Service
→ Prisma
→ DB 저장

→ invalidate
→ Query 재요청
→ UI 업데이트
```

## 대시보드 설계

### 대시보드는 통합 API로 구성한다.

```txt
GET /api/dashboard
```

### 응답 구조:

```txt
{
  summary,
  monthlyTrend,
  categoryRatio,
  targetProgress,
  recentActivities
}
```

## 주요 설계 결정

### 1. 배출량 저장 방식

- 저장 시 계산
- 조회 시 재계산하지 않음

### 2. 배출계수 분리

- 별도 테이블로 관리
- version 대응 가능

### 3. 대시보드 API

- 단일 API로 통합
- 요청 수 최소화

### 4. Excel Import

- 바로 저장하지 않음
- preview → validate → 저장

---

## 상태 관리 전략

- TanStack Query → 서버 상태
- React state → UI 상태

---

## 확장성 고려

- 카테고리 추가 가능
- 배출계수 변경 대응 가능
- 목표 설정 확장 가능
