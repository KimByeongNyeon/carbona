import { TargetCategory } from "./schemas/target.schema";

export interface EmissionTarget {
  id: number;
  year: number;
  month: number;
  category: TargetCategory | null;
  targetValue: number;
  unit: string;
  memo?: string | null;
  createdAt: string;
  updatedAt: string;
}
