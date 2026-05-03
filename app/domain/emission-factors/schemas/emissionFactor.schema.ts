import { z } from "zod";

export const emissionFactorCategorySchema = z.enum([
  "ELECTRICITY",
  "MATERIAL",
  "TRANSPORT",
]);

export const createEmissionFactorSchema = z.object({
  name: z.string().min(1, "배출계수 이름을 입력해주세요."),
  category: emissionFactorCategorySchema,
  unit: z.string().min(1, "단위를 입력해주세요."),
  factor: z.number().positive("배출계수는 0보다 커야 합니다."),
  factorUnit: z.string().min(1, "배출계수 단위를 입력해주세요."),
  source: z.string().optional(),
  version: z.string().optional(),
});

export const updateEmissionFactorSchema = createEmissionFactorSchema
  .partial()
  .extend({
    isActive: z.boolean().optional(),
  });

export type CreateEmissionFactorInput = z.infer<
  typeof createEmissionFactorSchema
>;

export type UpdateEmissionFactorInput = z.infer<
  typeof updateEmissionFactorSchema
>;

export type EmissionFactorCategory = z.infer<
  typeof emissionFactorCategorySchema
>;
