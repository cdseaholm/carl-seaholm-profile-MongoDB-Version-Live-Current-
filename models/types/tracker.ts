import { Tracker } from "@/components/pagecomponents/dashboard/statsView";

export type TrackerData = {
    newTrackerData: Tracker[]; 
    daysWithHobbies: number[]; 
    monthLength: number;
}