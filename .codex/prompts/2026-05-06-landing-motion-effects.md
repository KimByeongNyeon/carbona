# 랜딩 페이지 motion 인터랙션 추가

## 정리된 프롬프트

제출 전 마지막 개선으로 랜딩 페이지에 motion 라이브러리를 적용해 인터랙티브 효과를 추가한다. 범위는 랜딩 페이지로 제한하고, 기존 서버 페이지 구조는 유지하면서 실제 애니메이션은 client component로 분리한다.

## 작업 의도

- 랜딩 페이지의 첫인상과 완성도를 높인다.
- hero, CTA, 카드, 섹션 진입에 자연스러운 움직임을 부여한다.
- 대시보드와 폼 영역은 건드리지 않아 제출 직전 리스크를 줄인다.

## 작업 범위

- `motion` 패키지 설치
- 랜딩 페이지 전용 client component 추가
- hero 영역 fade-up/stagger 적용
- CTA hover/tap 인터랙션 적용
- 이유 카드, 기능 카드, workflow 카드 hover 및 scroll reveal 적용
- `app/page.tsx`는 서버 컴포넌트로 유지하고 client component 렌더링만 담당하도록 정리

## 변경한 파일

- `package.json`
- `yarn.lock`
- `app/page.tsx`
- `app/domain/landing/components/LandingPageClient.tsx`

## 검증 결과

- 랜딩 변경 파일 기준 ESLint 통과
- `tsc --noEmit --pretty false` 통과
- `next build --webpack` 통과

## 후속 작업

- 실제 브라우저에서 모바일과 데스크톱 스크롤 동작을 확인하면 좋다.
- 사용자가 움직임을 줄이도록 설정한 환경에 맞춰 세부 motion 강도를 더 낮출 수 있다.
