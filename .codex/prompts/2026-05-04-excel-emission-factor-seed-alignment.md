# Excel 배출계수 매칭용 Seed 정렬

## 정리된 프롬프트

Excel 미리보기에서 모든 행이 `배출계수 없음`으로 표시되는 문제를 해결한다. 실제 과제 Excel 파일의 `설명`, `활동 유형`, `단위` 값과 DB의 활성 배출계수 데이터가 정확히 매칭되도록 seed와 로컬 DB 상태를 정리한다.

## 작업 의도

- Excel Import preview가 과제 파일의 30개 활동 데이터를 모두 정상 검증하도록 만든다.
- 배출계수 이름을 Excel의 실제 설명 값 기준으로 맞춘다.
- 비활성화된 `한국전력` 배출계수를 다시 활성화한다.
- 오른쪽 참고용 배출계수 표의 값과 DB seed 값을 일치시킨다.

## 작업 범위

- seed 배출계수 이름과 계수 수정
- 로컬 DB 배출계수 upsert 및 활성화
- 실제 Excel 파일 기준 배출계수 매칭 결과 확인
- lint/build 검증

## 변경한 파일

- `prisma/seed.ts`

## 검증 결과

- 로컬 DB에 `한국전력`, `플라스틱 1`, `플라스틱 2`, `트럭` 활성 배출계수 반영
- 실제 과제 Excel 파일 기준 총 30행 중 30행 매칭 성공
- `yarn eslint prisma/seed.ts app/domain/excel/services/excelPreview.service.ts` 통과
- `./node_modules/.bin/next build --webpack` 통과

## 후속 작업

- 배출계수 관리 화면에서 이전 이름인 `플라스틱`, `트럭 운송`을 유지할지 비활성화할지 결정한다.
- 필요하면 seed를 delete-and-create 방식 대신 upsert 방식으로 바꿔 기존 데이터 보존 전략을 명확히 한다.
