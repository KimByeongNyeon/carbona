import { z } from "zod";

export const targetCategorySchema = z.enum([
  "ELECTRICITY",
  "MATERIAL",
  "TRANSPORT",
]);

export const createTargetSchema = z.object({
  year: z.coerce.number().int(),
  month: z.coerce.number().int().min(1).max(12),
  category: z.preprocess(
    (value) => (value === "" ? undefined : value),
    targetCategorySchema.optional(),
  ),
  targetValue: z.coerce.number().positive(),
  memo: z.string().optional(),
});

export const getTargetsSchema = z.object({
  year: z.coerce.number().int(),
  month: z.coerce.number().int().min(1).max(12),
});

export type TargetCategory = z.infer<typeof targetCategorySchema>;
export type CreateTargetInput = z.infer<typeof createTargetSchema>;
export type GetTargetsInput = z.infer<typeof getTargetsSchema>;
