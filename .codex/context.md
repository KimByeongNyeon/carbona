## 프로젝트 개요

이 프로젝트는 PCF(Product Carbon Footprint) 기반 탄소 배출량 관리 플랫폼이다.

사용자는 전기, 원소재, 운송 등의 활동 데이터를 입력하고, 시스템은 배출계수를 기반으로 탄소 배출량을 계산하여 저장한다. 이후 대시보드를 통해 배출량을 시각화하고 목표 대비 상태를 확인할 수 있다.

---

## 핵심 기능

### 1. 활동 데이터 관리

- 활동 데이터 입력 (수동)
- 활동 데이터 조회 / 수정 / 삭제
- 배출량 자동 계산

---

### 2. 배출계수 관리

- 배출계수 CRUD
- 활동 데이터와 연동

---

### 3. 대시보드

- 총 배출량 KPI
- 활동 유형별 비중 (전기 / 원소재 / 운송)
- 월별 배출량 추이
- 최근 활동 데이터
- 목표 대비 진행률

---

### 4. 목표 설정

- 월별 배출량 목표 설정
- 목표 대비 진행률 계산
- 초과/주의/정상 상태 표시

---

### 5. Excel Import

- Excel 업로드
- 데이터 파싱 (xlsx)
- 검증
- 미리보기
- DB 저장

---

## 도메인 정의

### Activity
사용자의 활동 데이터 (전기 사용량, 원소재 사용량 등)

### EmissionFactor
활동별 배출계수

### EmissionTarget
월별 목표 배출량

### ImportLog
Excel 업로드 이력

---

## 탄소 배출량 계산

```ts
emissionValue = amount * emissionFactor.factor
계산은 저장 시 수행한다.
계산 결과는 DB에 저장한다.
사용한 배출계수 ID를 함께 저장한다.
기술 스택
Next.js (App Router)
TypeScript
PostgreSQL
Prisma
TanStack Query
Zod
React Hook Form
Recharts
xlsx
Tailwind CSS
상태 관리 전략
서버 상태: TanStack Query
UI 상태: React state (필요 시 Zustand 고려)
API 설계 방향
REST 기반 API
도메인 단위로 분리
대시보드는 통합 API로 구성
GET /api/dashboard
목표

단순 CRUD가 아니라

계산
집계
시각화
인사이트 제공

까지 포함하는 탄소 관리 플랫폼을 구현한다.