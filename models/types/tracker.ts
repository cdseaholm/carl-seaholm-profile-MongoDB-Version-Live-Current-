import { Tracker } from "@/app/(content)/dashboard/components/statsView";

export type MonthlyTrackerData = {
    newTrackerData: Tracker[]; 
    monthLength: number;
}