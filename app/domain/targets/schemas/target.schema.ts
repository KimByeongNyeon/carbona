import { z } from "zod";

export const targetCategorySchema = z.enum([
  "ELECTRICITY",
  "MATERIAL",
  "TRANSPORT",
]);

export const createTargetSchema = z.object({
  year: z.coerce
    .number("연도를 숫자로 입력해주세요.")
    .int("연도는 정수로 입력해주세요."),
  month: z.coerce
    .number("월을 선택해주세요.")
    .int("월은 정수로 입력해주세요.")
    .min(1, "월은 1월부터 12월까지 선택할 수 있습니다.")
    .max(12, "월은 1월부터 12월까지 선택할 수 있습니다."),
  category: z.preprocess(
    (value) => (value === "" ? undefined : value),
    targetCategorySchema.optional(),
  ),
  targetValue: z.coerce
    .number("목표 배출량을 숫자로 입력해주세요.")
    .positive("목표 배출량은 0보다 커야 합니다."),
  memo: z.string().optional(),
});

export const getTargetsSchema = z.object({
  year: z.coerce.number().int(),
  month: z.coerce.number().int().min(1).max(12),
});

export type TargetCategory = z.infer<typeof targetCategorySchema>;
export type CreateTargetInput = z.infer<typeof createTargetSchema>;
export type GetTargetsInput = z.infer<typeof getTargetsSchema>;
