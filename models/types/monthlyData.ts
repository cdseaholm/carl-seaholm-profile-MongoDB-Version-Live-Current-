import { CalendarColors } from "./calColorInfo";

export interface IMonthlyData {
    month: number;
    userEmail?: string;
    userId?: string;
    monthColorInfo: CalendarColors;
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
}