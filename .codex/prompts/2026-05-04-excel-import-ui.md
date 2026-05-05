# Excel Import UI/UX 구성

## 정리된 프롬프트

Excel 미리보기 API와 mutation 연결이 준비된 상태에서 사용자가 파일을 업로드하고 검증 결과를 확인할 수 있는 실제 화면을 구성한다. 기존 대시보드 레이아웃과 참고 이미지의 업무용 UI 톤을 유지하면서 업로드, 검증 통계, 미리보기 테이블이 한 흐름으로 이어지도록 만든다.

## 작업 의도

- `/excel` 페이지를 실제 사용 가능한 Excel Import 화면으로 연결한다.
- 컴포넌트 내부 비즈니스 로직을 줄이고 파일 선택, 미리보기 실행, 통계 계산은 hook과 util로 분리한다.
- 미리보기 성공 행과 오류 행을 테이블에서 명확히 구분한다.
- 서버 preview 결과의 날짜 값을 클라이언트에서 다루기 좋게 문자열 타입으로 정리한다.

## 작업 범위

- Excel 페이지 route 추가
- Excel Import 메인 페이지 컴포넌트 추가
- 파일 업로드 패널 추가
- 미리보기 결과 테이블 추가
- Excel 페이지 상태 관리 hook 추가
- Excel preview 타입 분리
- Excel 표시용 formatter와 통계 util 추가
- preview service 응답의 날짜 직렬화 보정

## 변경한 파일

- `app/(dashboard)/excel/page.tsx`
- `app/domain/excel/components/ExcelPage.tsx`
- `app/domain/excel/components/ExcelUploadPanel.tsx`
- `app/domain/excel/components/ExcelPreviewTable.tsx`
- `app/domain/excel/hooks/useExcelPage.ts`
- `app/domain/excel/types.ts`
- `app/domain/excel/utils/excel.util.ts`
- `app/domain/excel/services/excelPreview.service.ts`
- `app/domain/excel/api/excel.api.ts`

## 검증 결과

- Excel 관련 파일 ESLint 통과
- `./node_modules/.bin/tsc --noEmit --pretty false` 통과
- `./node_modules/.bin/next build --webpack` 통과
- 전체 `yarn lint`는 기존 `app/generated/prisma/**` 생성 코드가 검사 대상에 포함되어 실패

## 후속 작업

- 실제 Excel 파일을 업로드해 성공/오류 행 표시를 브라우저에서 확인한다.
- 저장 API가 준비되면 미리보기 성공 행을 저장 요청으로 연결한다.
- 샘플 다운로드 버튼에 실제 템플릿 파일 생성 또는 다운로드 기능을 연결한다.
