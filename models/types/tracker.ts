import { Tracker } from "@/components/pagecomponents/dashboard/statsView";

export type MonthlyTrackerData = {
    newTrackerData: Tracker[]; 
    monthLength: number;
}