# SSR 랜딩 페이지 제작

## 정리된 프롬프트

루트 경로에 SSR 기반 랜딩 페이지를 만든다. Toss 스타일의 넓은 여백, 큰 타이포그래피, 명확한 CTA를 사용하고, PCF의 의미와 추적 필요성, Carbona 서비스 요약을 자연스럽게 설명한다. 로고는 `.codex/logo.png`를 사용한다.

## 작업 의도

- `/` 진입 시 바로 대시보드로 이동하지 않고 서비스 소개 페이지를 보여준다.
- PCF가 무엇인지, 왜 추적해야 하는지, 이 서비스가 어떤 흐름을 제공하는지 빠르게 이해하게 한다.
- 기존 앱 기능인 활동 입력, Excel 가져오기, 대시보드, 목표 관리, PDF 보고서로 연결되는 CTA를 제공한다.

## 작업 범위

- `app/page.tsx`의 redirect 제거
- 서버 컴포넌트 기반 랜딩 페이지 구현
- `.codex/logo.png`를 `public/logo.png`로 복사해 랜딩 페이지에서 표시
- PCF 설명, 추적 이유, 서비스 기능, 업무 흐름 섹션 구성
- Toss 스타일에 맞춰 흰 배경, 큰 텍스트, 부드러운 카드, 선명한 버튼 중심으로 UI 구성

## 변경한 파일

- `app/page.tsx`
- `public/logo.png`

## 검증 결과

- `app/page.tsx` ESLint 통과
- `tsc --noEmit --pretty false` 통과
- `next build --webpack` 통과
- 전체 `yarn lint`는 generated Prisma 산출물의 기존 lint 이슈로 실패

## 후속 작업

- 실제 브라우저에서 모바일/데스크톱 첫 화면의 텍스트 줄바꿈과 CTA 위치를 확인하면 더 좋다.
- generated Prisma 폴더를 ESLint 제외 대상으로 분리하면 전체 lint 기준을 안정적으로 사용할 수 있다.
