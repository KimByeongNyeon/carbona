import { z } from "zod";

export const activityCategorySchema = z.enum([
  "ELECTRICITY",
  "MATERIAL",
  "TRANSPORT",
]);

export const createActivitySchema = z.object({
  activityDate: z.coerce.date("일자를 선택해주세요."),
  category: activityCategorySchema,
  itemName: z.string().min(1, "설명을 입력해주세요."),
  amount: z
    .number("활동량을 숫자로 입력해주세요.")
    .positive("활동량은 0보다 커야 합니다."),
  unit: z.string().min(1, "단위를 입력해주세요."),
  emissionFactorId: z
    .number("배출계수를 선택해주세요.")
    .int("배출계수 정보가 올바르지 않습니다.")
    .positive("배출계수를 선택해주세요."),
  memo: z.string().optional(),
});

export const deleteActivitySchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type ActivityCategory = z.infer<typeof activityCategorySchema>;
export type CreateActivityInput = z.infer<typeof createActivitySchema>;
export type DeleteActivityInput = z.infer<typeof deleteActivitySchema>;
