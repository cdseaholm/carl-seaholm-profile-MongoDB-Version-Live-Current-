import { Tracker } from "@/app/(content)/dashboard/components/statsView";
import { PieChartCell } from "@mantine/charts";
import { HobbySessionInfo, MonthlyInfo } from "./hobbyData";

export interface DashPropsResultsType {
    status: boolean;
    message: string;
    hobbySessionInfo: HobbySessionInfo[];
    daysWithPie: PieChartCell[];
    percentagesByHobbies: PieChartCell[];
    barData: any;
    barDataTwo: any;
    tracker: Tracker;
    monthlyInfo: MonthlyInfo[];
    hobbyData: HobbySessionInfo[];
}

export interface BarChartDataType {
    date: string;
    time: number;
    color: string;
}