export type ActivityCategory = "ELECTRICITY" | "MATERIAL" | "TRANSPORT";

export interface Activity {
  id: number;
  activityDate: string;
  category: ActivityCategory;
  itemName: string;
  amount: number;
  unit: string;
  emissionFactorId: number;
  emissionValue: number;
  memo?: string;
  inputType: "MANUAL" | "EXCEL";
  createdAt: string;
  updatedAt: string;
}

export interface ActivityRequest {
  activityDate: string;
  category: ActivityCategory;
  itemName: string;
  amount: number;
  unit: string;
  emissionFactorId: number;
  memo?: string;
}
