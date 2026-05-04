import z from "zod";

export const excelRowSchema = z.object({
  activityDate: z.coerce.date(),
  category: z.enum(["ELECTRICITY", "MATERIAL", "TRANSPORT"]),
  itemName: z.string().min(1),
  amount: z.coerce.number().positive(),
  unit: z.string().min(1),
});

export const excelImportRowSchema = excelRowSchema.extend({
  emissionFactorId: z.number().int().positive(),
});

export const excelImportSchema = z.object({
  fileName: z.string().min(1),
  rows: z.array(excelImportRowSchema).min(1),
});

export type ExcelRowInput = z.infer<typeof excelRowSchema>;
export type ExcelImportRowInput = z.infer<typeof excelImportRowSchema>;
export type ExcelImportInput = z.infer<typeof excelImportSchema>;
