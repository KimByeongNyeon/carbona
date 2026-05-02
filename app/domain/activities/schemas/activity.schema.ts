import { z } from "zod";

export const createActivitySchema = z.object({
  activityDate: z.coerce.date(),
  category: z.enum(["ELECTRICITY", "MATERIAL", "TRANSPORT"]),
  itemName: z.string().min(1),
  amount: z.number().positive(),
  unit: z.string().min(1),
  emissionFactorId: z.number().int().positive(),
  memo: z.string().optional(),
});

export type createActivityInput = z.infer<typeof createActivitySchema>;
