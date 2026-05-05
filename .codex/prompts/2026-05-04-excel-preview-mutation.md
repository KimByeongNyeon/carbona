# Excel 미리보기 Mutation 연결

## 정리된 프롬프트

Excel Import 미리보기 API가 준비된 상태에서 클라이언트가 파일을 선택한 뒤 preview 요청을 실행할 수 있도록 TanStack Query mutation 파일을 완성한다.

## 작업 의도

- 컴포넌트에서는 `File`만 관리하고, API 함수 내부에서 `FormData`를 생성하는 구조를 유지한다.
- Excel preview API 함수가 반환하는 미리보기 결과를 mutation에서 그대로 받을 수 있게 한다.
- 클라이언트 코드가 서버 전용 Excel preview service를 런타임 import하지 않도록 타입 전용 import로 정리한다.

## 작업 범위

- Excel preview mutation hook 작성
- mutation key 추가
- 기존 hook의 `FormData` 매개변수 오용 수정
- Excel API 타입 import 방식 보정

## 변경한 파일

- `app/domain/excel/hooks/useExcelQuery.ts`
- `app/domain/excel/api/excel.api.ts`

## 검증 결과

- Excel 관련 파일 ESLint 통과
- `./node_modules/.bin/tsc --noEmit --pretty false` 통과
- `./node_modules/.bin/next build --webpack` 통과
- 전체 `yarn lint`는 기존 `app/generated/prisma/**` 생성 코드가 검사 대상에 포함되어 실패

## 후속 작업

- Excel Import 화면에서 선택한 `File`을 `useExcelPreviewMutation`에 넘겨 미리보기 테이블을 렌더링한다.
- preview 성공 행과 실패 행을 구분해 사용자에게 저장 가능 여부를 표시한다.
