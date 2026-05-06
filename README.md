# Carbona

Carbona는 PCF(Product Carbon Footprint) 기반 탄소 배출량 관리 플랫폼입니다.

사용자는 전기, 원소재, 운송과 같은 활동 데이터를 입력하거나 Excel로 가져올 수 있고, 시스템은 배출계수를 기준으로 탄소 배출량을 계산해 저장합니다. 이후 대시보드에서 월별 배출량 추이, 활동 유형별 비중, 전월 대비 변화, 목표 대비 진행률을 확인하고 PDF 보고서로 내보낼 수 있습니다.

이 프로젝트는 단순 CRUD보다 “입력 → 검증 → 계산 → 추적 → 보고” 흐름을 완성하는 데 초점을 두었습니다.

## 목차

- [프로젝트 목적](#프로젝트-목적)
- [실행 영상](#실행-영상)
- [핵심 기능](#핵심-기능)
- [탄소 회계 개념 반영](#탄소-회계-개념-반영)
- [기술 스택](#기술-스택)
- [실행 방법](#실행-방법)
- [Docker 실행 방법](#docker-실행-방법)
- [프로젝트 구조](#프로젝트-구조)
- [아키텍처](#아키텍처)
- [데이터베이스 모델](#데이터베이스-모델)
- [주요 API](#주요-api)
- [주요 설계 결정](#주요-설계-결정)
- [Trade-off](#trade-off)
- [향후 개선 방향](#향후-개선-방향)
- [검증 기준](#검증-기준)
- [AI 도구 활용](#ai-도구-활용)

## 프로젝트 목적

기업의 탄소 관리는 점점 제품 단위로 세분화되고 있습니다. 총 배출량만 확인하는 방식으로는 어떤 제품, 어떤 활동, 어떤 원재료가 배출에 큰 영향을 주는지 파악하기 어렵습니다.

Carbona는 다음 문제를 해결하기 위해 만들어졌습니다.

- 활동 데이터와 배출계수가 분리되어 계산 기준을 추적하기 어려운 문제
- Excel 기반 데이터가 실제 저장 전에 검증되지 않아 오류가 뒤늦게 발견되는 문제
- 월별 배출량, 전월 대비 증감률, 목표 대비 상태를 한 화면에서 보기 어려운 문제
- 보고서 작성에 필요한 계산 결과와 근거 데이터를 수작업으로 정리해야 하는 문제

## 실행 영상

아래 영상은 `public/` 폴더에 포함된 UI 실행 자료입니다. 파일명 순서대로 주요 화면과 기능 흐름을 확인할 수 있습니다.

### 01. 랜딩페이지

<video controls width="100%">
  <source src="./public/01 랜딩페이지.mov" type="video/quicktime">
</video>

### 02. 대시보드

<video controls width="100%">
  <source src="./public/02 대시보드.mov" type="video/quicktime">
</video>

### 03. 활동 데이터 입력

<video controls width="100%">
  <source src="./public/03 활동 데이터 입력.mov" type="video/quicktime">
</video>

### 04. 엑셀 불러오기

<video controls width="100%">
  <source src="./public/04 엑셀 불러오기.mov" type="video/quicktime">
</video>

### 05. 배출계수 관리

<video controls width="100%">
  <source src="./public/05 배출계수 관리.mov" type="video/quicktime">
</video>

### 06. 목표

<video controls width="100%">
  <source src="./public/06 목표.mov" type="video/quicktime">
</video>

## 핵심 기능

### 1. SSR 랜딩 페이지

루트 경로(`/`)에는 서비스 소개 랜딩 페이지가 제공됩니다.

랜딩 페이지는 다음 내용을 설명합니다.

- PCF가 무엇인지
- 왜 제품 단위 탄소 배출을 추적해야 하는지
- Carbona가 제공하는 입력, 계산, 추적, 보고 흐름

### 2. 활동 데이터 관리

활동 데이터는 사용자가 직접 입력하는 탄소 배출의 원천 데이터입니다.

지원 기능:

- 활동 일자 입력
- 활동 유형 선택: 전기, 원소재, 운송
- 항목명, 활동량, 단위 입력
- 배출계수 선택
- 저장 시 배출량 자동 계산
- 최근 활동 데이터 조회
- 활동 데이터 삭제

배출량 계산식:

```ts
emissionValue = amount * emissionFactor.factor
```

계산 결과는 저장 시점에 고정됩니다. 이후 배출계수가 수정되더라도 과거 활동 데이터의 계산 결과가 흔들리지 않도록 하기 위한 설계입니다.

### 3. 배출계수 관리

배출계수는 활동량을 탄소 배출량으로 환산하기 위한 기준 값입니다.

지원 기능:

- 배출계수 목록 조회
- 배출계수 생성
- 배출계수 비활성화
- 비활성 배출계수 재활성화
- 카테고리, 상태, 검색어 기반 필터링

배출계수는 실제 삭제하지 않고 비활성화합니다. 이미 저장된 활동 데이터가 특정 배출계수를 참조하고 있기 때문에, 과거 계산 근거를 보존하는 것이 중요합니다.

### 4. Excel 가져오기

Excel 업로드는 미리보기와 저장 단계를 분리했습니다.

처리 흐름:

1. Excel 파일 선택
2. 필수 헤더 탐색
3. 활동 데이터 행 파싱
4. 행별 Zod 검증
5. 활성 배출계수 매칭
6. 미리보기 결과 표시
7. 모든 행이 유효할 때 DB 저장

미리보기 단계에서는 DB에 저장하지 않습니다. 사용자가 어떤 행이 저장 가능한지, 어떤 행에 배출계수가 없는지 먼저 확인할 수 있게 하기 위한 설계입니다.

지원 필수 컬럼:

- `일자(원본)`
- `활동 유형`
- `설명`
- `량`
- `단위`

### 5. 대시보드

대시보드는 활동 데이터를 기준으로 탄소 배출 현황을 집계합니다.

제공 정보:

- 총 배출량
- 전기 배출량
- 원소재 배출량
- 운송 배출량
- 전월 대비 증감률
- 월별 총 배출량 추이
- 활동 유형별 배출 비중
- 최근 활동 데이터
- 목표 대비 진행률
- 목표 상태 알림

월 선택과 기간 선택을 지원합니다.

- 월 선택: 실제 활동 데이터가 존재하는 월 기준
- 기간 선택: 선택 월을 기준으로 최근 N개월 추이 표시
- 전월 대비: 선택 월과 직전 월을 비교

### 6. 목표 관리

월별 목표 배출량을 설정하고 대시보드에서 진행률을 확인할 수 있습니다.

지원 기능:

- 연도, 월 선택
- 전체 목표 설정
- 카테고리별 목표 설정
- 같은 기간과 카테고리의 목표 재저장 시 기존 목표 갱신
- 목표 대비 상태 계산

목표 상태 기준:

- 목표 없음: 목표가 설정되지 않음
- 정상: 목표 대비 80% 미만
- 주의: 목표 대비 80% 이상
- 초과: 목표 대비 100% 이상

### 7. PDF 보고서 내보내기

대시보드에서 선택한 월과 기간 기준으로 PDF 보고서를 생성합니다.

보고서에 포함되는 내용:

- 선택 월과 기간
- 총 배출량 요약
- 카테고리별 배출량
- 월별 추이
- 최근 활동 데이터
- 목표 대비 진행률

PDF 생성은 서버 route(`/api/reports`)에서 처리합니다.

## 탄소 회계 개념 반영

### PCF

PCF(Product Carbon Footprint)는 제품의 생애주기 또는 특정 산정 범위 안에서 발생하는 온실가스 배출량을 제품 단위로 계산한 값입니다.

이 프로젝트에서는 제품 단위 PCF 전체 산정 체계를 완전하게 구현하기보다, PCF 계산의 기본이 되는 활동 데이터 수집과 배출계수 기반 계산 흐름을 구현했습니다.

### GHG Scope 관점

GHG Protocol의 Scope 개념을 기준으로 보면, 현재 프로젝트의 활동 유형은 다음과 같이 확장될 수 있습니다.

- 전기: 일반적으로 Scope 2 배출량에 해당
- 원소재: 공급망 또는 구매 원재료와 연결되어 Scope 3로 확장 가능
- 운송: 운송 주체와 소유 관계에 따라 Scope 1 또는 Scope 3로 확장 가능

현재 데이터 모델은 `ActivityCategory`를 전기, 원소재, 운송으로 구분합니다. 향후 Scope 필드를 별도로 추가하면 탄소 회계 기준에 더 직접적으로 맞춘 분석이 가능합니다.

## 기술 스택

### Frontend

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Recharts
- lucide-react

### Backend

- Next.js Route Handler
- Prisma
- PostgreSQL
- Zod 기반 API 입력 검증

### State Management

- TanStack Query: 서버 상태 관리
- React state: 화면 UI 상태 관리

### File and Report

- xlsx: Excel 파일 파싱
- @react-pdf/renderer: PDF 보고서 생성

### Infra

- Docker
- Docker Compose
- PostgreSQL 16

## 실행 방법

일반 로컬 실행 방식입니다.

### 1. 의존성 설치

```bash
yarn install
```

### 2. PostgreSQL 실행

```bash
docker compose up -d postgres
```

### 3. 환경 변수 확인

프로젝트 루트의 `.env` 파일에 다음 값이 필요합니다.

```env
DATABASE_URL="postgresql://pcf_user:pcf_password@localhost:5432/pcf_db"
```

### 4. DB schema 반영과 seed 실행

```bash
yarn prisma db push
yarn prisma db seed
```

seed는 기본 배출계수를 등록합니다.

### 5. 개발 서버 실행

```bash
yarn dev
```

브라우저에서 다음 주소로 접속합니다.

```txt
http://localhost:3000
```

### Production 모드 실행

로컬에서 production 모드로 확인하려면 다음 순서로 실행합니다.

```bash
yarn build
yarn start
```

`yarn start`는 `yarn build` 이후 실행해야 합니다.

## Docker 실행 방법

Docker Compose로 PostgreSQL과 Next.js 앱을 함께 실행할 수 있습니다.

### 1. 이미지 빌드 및 컨테이너 실행

```bash
docker compose up -d --build
```

### 2. 실행 상태 확인

```bash
docker compose ps
```

### 3. 접속

```txt
http://localhost:3000
```

### 4. seed 데이터가 필요할 경우

Compose는 앱 시작 시 `prisma db push`를 실행해 schema를 반영합니다. seed는 기존 데이터에 영향을 줄 수 있어 자동 실행하지 않습니다.

필요할 때 다음 명령으로 실행합니다.

```bash
docker compose exec next-app yarn prisma db seed
```

### 5. 종료

```bash
docker compose down
```

볼륨까지 삭제하려면 다음 명령을 사용합니다.

```bash
docker compose down -v
```

## 프로젝트 구조

```txt
app/
  (dashboard)/
    activities/
    dashboard/
    emission-factors/
    excel/
    targets/
    layout.tsx

  api/
    activities/
    dashboard/
    emission-factors/
    excel/
    reports/
    targets/

  domain/
    activities/
    dashboard/
    emission-factors/
    excel/
    reports/
    targets/

  lib/
    axios.ts
    prisma.ts
    providers.tsx

  shared/
    components/
    constants/
    utils/

prisma/
  schema.prisma
  seed.ts
  migrations/

public/
  logo.png
```

## 아키텍처

이 프로젝트는 도메인 기반 구조를 따릅니다.

각 도메인은 다음 책임을 가집니다.

```txt
components  화면 렌더링
hooks       화면 상태와 Query 조합
api         클라이언트 HTTP 요청 함수
services    서버 비즈니스 로직
schemas     Zod 입력 검증
utils       표시값 변환과 순수 계산
types       도메인 타입
```

전체 데이터 흐름은 다음과 같습니다.

```txt
사용자 입력
→ React Hook Form
→ Zod 검증
→ TanStack Query Mutation
→ Client API 함수
→ Next.js Route Handler
→ Service
→ Prisma
→ PostgreSQL
→ Query invalidate
→ UI 갱신
```

### 상태 관리

서버 상태와 UI 상태를 분리했습니다.

- 서버 상태: TanStack Query
- 폼 상태: React Hook Form
- 화면 선택 상태: React state

예를 들어 대시보드의 선택 월과 기간은 React state로 관리하고, 해당 값이 Query parameter가 되어 `/api/dashboard`를 다시 호출합니다.

## 데이터베이스 모델

### EmissionFactor

배출계수 테이블입니다.

주요 필드:

- `name`: 배출계수 이름
- `category`: 전기, 원소재, 운송
- `unit`: 활동 단위
- `factor`: 배출계수 값
- `factorUnit`: 배출계수 단위
- `source`: 출처
- `version`: 버전
- `isActive`: 활성 여부

활동 데이터 계산 시 사용되는 기준 값입니다.

### Activity

사용자가 입력하거나 Excel로 가져온 활동 데이터입니다.

주요 필드:

- `activityDate`: 활동 일자
- `category`: 활동 유형
- `itemName`: 항목명
- `amount`: 활동량
- `unit`: 단위
- `emissionFactorId`: 사용된 배출계수
- `emissionValue`: 계산된 탄소 배출량
- `inputType`: 수동 입력 또는 Excel 입력

### EmissionTarget

월별 목표 배출량입니다.

주요 필드:

- `year`
- `month`
- `category`
- `targetValue`
- `unit`
- `memo`

`category`가 `null`이면 전체 목표를 의미합니다.

### ImportLog

Excel import 결과를 기록하는 테이블입니다.

주요 필드:

- `fileName`
- `totalRows`
- `successRows`
- `failedRows`
- `status`
- `errorMessage`

## 주요 API

### Activities

```txt
GET    /api/activities
POST   /api/activities
DELETE /api/activities?id={id}
```

역할:

- 활동 데이터 조회
- 활동 데이터 생성
- 활동 데이터 삭제

생성 시 배출계수 존재 여부, 활성 여부, 카테고리 일치, 단위 일치를 검증합니다.

### Emission Factors

```txt
GET    /api/emission-factors
POST   /api/emission-factors
PATCH  /api/emission-factors/{id}
DELETE /api/emission-factors/{id}
```

역할:

- 배출계수 조회
- 배출계수 생성
- 활성 상태 변경
- 비활성화

동일한 이름, 카테고리, 단위의 활성 배출계수는 하나만 허용합니다.

### Dashboard

```txt
GET /api/dashboard?year={year}&month={month}&period={period}
```

역할:

- 선택 월 기준 KPI 집계
- 월별 추이 집계
- 카테고리별 비중 계산
- 최근 활동 데이터 반환
- 목표 대비 진행률 계산에 필요한 데이터 제공

### Targets

```txt
GET  /api/targets?year={year}&month={month}
POST /api/targets
```

역할:

- 월별 목표 조회
- 전체 또는 카테고리별 목표 생성 및 갱신

### Excel

```txt
POST /api/excel/preview
POST /api/excel/import
```

역할:

- Excel 파일 미리보기
- 검증 완료된 Excel 데이터 저장

### Reports

```txt
GET /api/reports?year={year}&month={month}&period={period}
```

역할:

- 선택 월과 기간 기준 PDF 보고서 생성

## 주요 설계 결정

### 1. 배출량은 저장 시점에 계산

활동 데이터 저장 시 다음 값을 계산해 `Activity.emissionValue`에 저장합니다.

```ts
amount * emissionFactor.factor
```

조회할 때마다 배출량을 재계산하지 않습니다.

이유:

- 과거 활동 데이터의 계산 결과 보존
- 배출계수 변경 시 과거 대시보드 수치가 바뀌는 문제 방지
- 보고서와 이력 데이터의 안정성 확보

### 2. 배출계수는 삭제 대신 비활성화

배출계수는 활동 데이터와 관계를 맺습니다. 실제 삭제를 허용하면 과거 활동 데이터가 어떤 기준으로 계산되었는지 추적하기 어렵습니다.

따라서 삭제 동작은 비활성화로 처리했습니다.

### 3. Excel은 preview와 import 분리

Excel 파일은 곧바로 저장하지 않습니다.

이유:

- 파일 구조 오류를 저장 전에 확인
- 행별 오류 표시
- 배출계수 매칭 실패 표시
- 사용자가 import 전에 데이터를 검토할 수 있는 UX 제공

### 4. 대시보드는 통합 API 사용

대시보드는 `/api/dashboard` 하나로 필요한 데이터를 가져옵니다.

이유:

- 여러 API 요청으로 인한 화면 로딩 분산 방지
- 같은 기준 월과 기간으로 모든 지표를 일관되게 계산
- 프론트엔드 컴포넌트는 표시 역할에 집중

### 5. 폼 검증은 Zod와 React Hook Form 연결

잘못된 데이터 입력 시 서버 에러를 기다리지 않고 클라이언트에서 먼저 피드백을 제공합니다.

검증 예시:

- 활동량은 0보다 커야 함
- 목표 배출량은 0보다 커야 함
- 필수 문자열은 비어 있을 수 없음
- 배출계수 id는 양의 정수여야 함

## Trade-off

### 1. `prisma db push`와 migration

Docker Compose에서는 앱 시작 시 `prisma db push`를 실행합니다.

장점:

- fresh DB에서 빠르게 실행 가능
- 과제 확인자가 별도 migration 명령을 몰라도 앱 실행 가능

단점:

- 운영 환경에서는 migration history를 명확히 남기는 `prisma migrate deploy`가 더 적합
- schema 변경 이력을 엄격히 관리하기 어렵다

현재 프로젝트에는 migration 파일도 포함되어 있으므로, 실제 운영 환경이라면 `db push` 대신 `migrate deploy`로 전환하는 것이 좋습니다.

### 2. seed 자동 실행 제외

Docker Compose에서 seed를 자동 실행하지 않았습니다.

장점:

- 기존 데이터가 있는 DB에서 seed가 의도치 않게 데이터를 변경하는 상황 방지
- 데이터 초기화와 앱 실행을 분리

단점:

- 처음 실행 후 기본 배출계수가 필요하면 seed 명령을 직접 실행해야 함

### 3. PDF 한글 폰트

PDF 보고서는 서버에서 생성하지만 한글 폰트 임베딩은 별도 설정하지 않았습니다.

장점:

- 구현 복잡도 감소
- PDF 생성 기능의 핵심 흐름을 빠르게 완성

단점:

- PDF 내부 한글 표현을 강화하려면 Pretendard 등 한글 폰트 등록이 필요

### 4. Scope를 별도 필드로 분리하지 않음

현재는 `ActivityCategory`로 전기, 원소재, 운송을 구분합니다.

장점:

- 입력 UX가 단순함
- 과제 범위 안에서 계산 흐름을 명확히 보여줄 수 있음

단점:

- GHG Scope 기반 리포팅을 하려면 별도 `scope` 필드 또는 매핑 테이블이 필요

## 향후 개선 방향

시간이 더 주어진다면 다음 기능을 개선하고 싶습니다.

### 1. 인증과 권한

현재는 단일 사용자 기준으로 설계되어 있습니다. 실제 서비스에서는 조직, 사용자, 권한이 필요합니다.

개선 방향:

- 조직 단위 workspace
- 관리자와 일반 사용자 권한 분리
- 사용자별 입력 이력 추적

### 2. 제품 단위 PCF 확장

현재는 활동 데이터 중심입니다. PCF를 더 직접적으로 다루려면 제품 모델이 필요합니다.

개선 방향:

- Product 모델 추가
- 제품별 Activity 연결
- 제품별 배출량 집계
- 제품별 PDF 보고서 생성

### 3. GHG Scope 세분화

활동 유형과 Scope를 분리하면 보고서 품질이 높아집니다.

개선 방향:

- `scope` 필드 추가
- Scope 1, 2, 3별 대시보드
- Scope별 목표 관리

### 4. 배출계수 versioning 강화

현재는 `version`, `isActive`를 통해 기본적인 버전 대응이 가능합니다.

개선 방향:

- 적용 시작일과 종료일
- 같은 항목의 버전 이력 조회
- 활동 일자 기준 자동 배출계수 선택

### 5. Excel import 안정성 강화

현재는 필수 헤더 기반으로 activity table을 찾습니다.

개선 방향:

- 여러 sheet 지원
- 컬럼 alias 지원
- import 실패 로그 상세 저장
- 부분 저장 옵션 제공

### 6. CI 품질 기준 정리

현재 전체 `yarn lint`는 generated Prisma 산출물 때문에 실패합니다.

개선 방향:

- `app/generated/prisma/**` ESLint 제외
- GitHub Actions에서 `lint`, `typecheck`, `build` 자동 실행
- Docker image build 검증

## AI 도구 활용

개발 과정에서 AI 도구를 사용해 다음 작업을 보조했습니다.

- Prisma 설정과 seed 데이터 구성 검토
- API route와 service 계층 분리
- 활동 데이터, 배출계수, 목표, Excel import 기능 구현 보조
- UI/UX 개선 방향 정리
- 대시보드 집계 로직과 PDF 내보내기 구현 보조
- Docker Compose 구성 정리
- README와 작업 기록 정리

작업별 프롬프트와 의도는 `.codex/prompts/` 폴더에 정리되어 있습니다.

## 마무리

Carbona는 탄소 배출량 계산 자체뿐 아니라, 그 계산이 어떤 입력값과 배출계수를 기반으로 만들어졌는지 추적하는 데 초점을 둔 프로젝트입니다.

비전문가도 데이터를 입력하고 결과를 읽을 수 있도록 입력 폼, Excel 미리보기, 대시보드, 목표 상태를 구성했고, 개발 구조는 도메인 단위로 나누어 확장성과 유지보수성을 고려했습니다.
