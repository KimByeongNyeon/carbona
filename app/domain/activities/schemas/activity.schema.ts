import { z } from "zod";

export const activityCategorySchema = z.enum([
  "ELECTRICITY",
  "MATERIAL",
  "TRANSPORT",
]);

export const createActivitySchema = z.object({
  activityDate: z.coerce.date(),
  category: activityCategorySchema,
  itemName: z.string().min(1),
  amount: z.number().positive(),
  unit: z.string().min(1),
  emissionFactorId: z.number().int().positive(),
  memo: z.string().optional(),
});

export const deleteActivitySchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type ActivityCategory = z.infer<typeof activityCategorySchema>;
export type CreateActivityInput = z.infer<typeof createActivitySchema>;
export type DeleteActivityInput = z.infer<typeof deleteActivitySchema>;
