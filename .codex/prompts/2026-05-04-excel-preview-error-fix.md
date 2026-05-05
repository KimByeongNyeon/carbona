# Excel 미리보기 에러 원인 분석 및 수정

## 정리된 프롬프트

Excel Import 기능을 구현하는 과정에서 미리보기 단계에서 발생한 에러의 원인을 분석하고, 파일 파싱 결과를 안전하게 검증해 성공/실패 행을 반환하도록 정리한다.

## 작업 의도

- Excel 미리보기 단계에서 발생한 TypeScript, ESLint 오류를 해결한다.
- Prisma `ActivityCategory`와 Excel row schema의 카테고리 값이 일치하도록 맞춘다.
- `xlsx`로 읽은 행 데이터를 `any` 없이 다루고, 알 수 없는 카테고리는 Zod 검증에서 실패하도록 처리한다.
- 배출계수 매칭 성공 시 미리보기 행에 계산된 배출량을 포함한다.

## 작업 범위

- Excel row schema 이름 및 타입 정리
- 카테고리 enum 오타 수정
- Excel sheet row 타입 정의
- preview 성공/실패 row 타입 정의
- `previewExcel` 함수가 미리보기 결과 배열을 반환하도록 수정
- 카테고리 매핑 유틸 타입 개선

## 변경한 파일

- `app/domain/excel/schemas/excel.schema.ts`
- `app/domain/excel/services/excelPreview.service.ts`
- `app/domain/excel/utils/excel.util.ts`

## 검증 결과

- Excel 관련 파일 ESLint 통과
- `./node_modules/.bin/tsc --noEmit --pretty false` 통과
- `./node_modules/.bin/next build --webpack` 통과
- 전체 `yarn lint`는 기존 `app/generated/prisma/**` 생성 코드가 검사 대상에 포함되어 실패

## 후속 작업

- `/api/excel/preview` route를 추가해 `previewExcel` 서비스를 HTTP 요청과 연결한다.
- 클라이언트 업로드 폼에서 미리보기 결과를 테이블로 표시한다.
- 실제 Excel 템플릿의 헤더명이 `일자(원본)`, `활동 유형`, `설명`, `량`, `단위`와 일치하는지 확인한다.
