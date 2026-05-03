import { EmissionFactorCategory } from "./schemas/emissionFactor.schema";

export interface EmissionFactor {
  id: number;
  name: string;
  category: EmissionFactorCategory;
  unit: string;
  factor: number;
  factorUnit: string;
  source?: string;
  version?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
