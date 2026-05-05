# 대시보드 PDF 내보내기

## 정리된 프롬프트

대시보드에서 선택한 기간과 월 기준의 데이터를 PDF 보고서로 내보낼 수 있도록 기능을 마무리한다. 화면의 필터 상태를 PDF 다운로드 API에 전달하고, 서버에서는 동일한 대시보드 집계 데이터를 기반으로 PDF 파일을 생성해 내려준다.

## 작업 의도

- 대시보드 마무리 기능으로 PDF 다운로드 제공
- 화면에서 확인한 월별/기간별 집계와 내보낸 보고서 데이터 일치
- 별도 복잡한 로직 없이 기존 대시보드 서비스 데이터를 재사용

## 작업 범위

- PDF 보고서 API 라우트 작성
- React PDF 문서 컴포넌트 작성
- 대시보드 필터 상태 기반 다운로드 URL 생성
- 대시보드 상단 액션 영역에 PDF 다운로드 버튼 추가
- PDF 응답에 적절한 파일명과 `application/pdf` 헤더 설정
- generated Prisma 외 실제 소스 lint 경고 정리

## 변경한 파일

- `app/api/reports/route.ts`
- `app/domain/reports/components/ReportPdfDocument.tsx`
- `app/domain/dashboard/hooks/useDashboardPage.ts`
- `app/domain/dashboard/components/DashboardPage.tsx`
- `app/domain/dashboard/services/dashboard.service.ts`
- `app/shared/constants/navigation.ts`

## 검증 결과

- 변경 파일 기준 ESLint 통과
- `tsc --noEmit --pretty false` 통과
- `next build --webpack` 통과
- 전체 `yarn lint`는 generated Prisma 산출물의 `require`, `any` 등 기존 lint 이슈로 실패

## 후속 작업

- PDF에 한글을 안정적으로 표시하려면 Pretendard 등 한글 폰트를 `@react-pdf/renderer`에 별도로 등록하는 개선을 검토한다.
- generated Prisma 폴더는 ESLint 제외 대상으로 분리하면 전체 lint를 CI 기준으로 더 깔끔하게 사용할 수 있다.
