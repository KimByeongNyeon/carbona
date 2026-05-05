# Excel Import 저장 기능 마무리

## 정리된 프롬프트

Excel 미리보기와 검증이 완료된 상태에서 성공 행을 실제 활동 데이터로 저장하고, 저장 결과를 대시보드와 활동 데이터 조회에 반영한다. Import Log를 함께 남겨 Excel 업로드 이력을 추적할 수 있게 한다.

## 작업 의도

- Excel preview 성공 행을 `Activity` 테이블에 저장한다.
- 저장 시 서버에서 배출계수 활성 여부와 카테고리, 단위를 다시 검증한다.
- 클라이언트가 보낸 배출량 값을 신뢰하지 않고 서버에서 `amount * factor`로 재계산한다.
- 저장된 활동 데이터의 `inputType`을 `EXCEL`로 구분한다.
- 저장 성공 후 `activities`, `dashboard` Query를 갱신한다.

## 작업 범위

- Excel import request schema 추가
- Excel import result type 추가
- Excel import service 추가
- `/api/excel/import` route 추가
- Excel import API 함수 추가
- Excel import mutation 추가
- Excel page 저장 버튼 연결
- 저장 성공 메시지 표시

## 변경한 파일

- `app/api/excel/import/route.ts`
- `app/domain/excel/api/excel.api.ts`
- `app/domain/excel/components/ExcelPage.tsx`
- `app/domain/excel/hooks/useExcelPage.ts`
- `app/domain/excel/hooks/useExcelQuery.ts`
- `app/domain/excel/schemas/excel.schema.ts`
- `app/domain/excel/services/excelImport.service.ts`
- `app/domain/excel/types.ts`

## 검증 결과

- Excel 관련 파일 ESLint 통과
- `./node_modules/.bin/tsc --noEmit --pretty false` 통과
- `./node_modules/.bin/next build --webpack` 통과
- 전체 `yarn lint`는 기존 `app/generated/prisma/**` 생성 코드가 검사 대상에 포함되어 실패

## 후속 작업

- 브라우저에서 실제 Excel 파일을 preview 후 저장해 활동 목록과 대시보드 갱신을 확인한다.
- 중복 업로드 방지 정책이 필요하면 동일 파일명 또는 동일 활동 행 기준의 중복 검사를 추가한다.
- Import Log 조회 화면이 필요하면 Excel 페이지에 업로드 이력 탭을 연결한다.
