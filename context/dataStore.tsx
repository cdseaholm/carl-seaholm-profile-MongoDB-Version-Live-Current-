import { create } from 'zustand';
import { HobbyColorMapType } from '@/models/types/colorMap';
import { PercentageType } from '@/components/pagecomponents/dashboard/statsView';
import { MonthSums, YearSums } from '@/app/actions/statsActions/statActions';
import { PieChartCell } from '@mantine/charts';
import { ISession } from '@/models/types/session';
import { HobbySessionInfo, MonthlyInfo } from '@/utils/apihelpers/get/initData/initDashboardParams';

type DataStore = {
  thisMonth: number;
  setThisMonth: (thisMonth: number) => void;
  daySelected: string;
  setDaySelected: (daySelected: string) => void;

  percentagesByHobbies: PercentageType[];
  setPercentagesByHobbies: (percentagesByHobbies: PercentageType[]) => void;
  barData: { date: string, time: number, color: string }[]
  setBarData: (barData: { date: string, time: number, color: string }[]) => void;
  barDataTwo: { date: string, time: number, color: string }[]
  setBarDataTwo: (barDataTwo: { date: string, time: number, color: string }[]) => void;
  daysWithPieChart: PieChartCell[]
  setDaysWithPieChart: (daysWithPieChart: PieChartCell[]) => void;

  monthlyInfoCounts: MonthlyInfo[];
  setMonthlyInfo: (monthlyInfoCounts: MonthlyInfo[]) => void;
  hobbySessionInfo: HobbySessionInfo[]
  setHobbySessionInfo: (hobbySessionInfo: HobbySessionInfo[]) => void;
  hobbyColorMap: HobbyColorMapType[];
  setHobbyColorMap: (colorMap: HobbyColorMapType[]) => void;
  sessions: ISession[];
  setSessions: (sessions: ISession[]) => void;

  monthlySummaries: MonthSums[];
  setMonthlySummaries: (monthlySummaries: MonthSums[]) => void;
  yearlySummaries: YearSums[];
  setYearlySummaries: (yearlySummaries: YearSums[]) => void;

};

export const useDataStore = create<DataStore>((set) => ({
  //calendar and date info
  thisMonth: new Date().getMonth() + 1 as number,
  setThisMonth: (thisMonth) => set({ thisMonth }),
  daySelected: new Date().toLocaleDateString(),
  setDaySelected: (daySelected) => set({ daySelected }),

  //charts
  percentagesByHobbies: [] as PercentageType[],
  setPercentagesByHobbies: (percentagesByHobbies) => set({ percentagesByHobbies }),
  barData: [] as { date: string, time: number, color: string }[],
  setBarData: (barData) => set({ barData }),
  barDataTwo: [] as { date: string, time: number, color: string }[],
  setBarDataTwo: (barDataTwo) => set({ barDataTwo }),
  daysWithPieChart: {} as PieChartCell[],
  setDaysWithPieChart: (daysWithPieChart) => set({ daysWithPieChart }),

  //data
  monthlyInfoCounts: [] as MonthlyInfo[],
  setMonthlyInfo: (monthlyInfoCounts) => set({ monthlyInfoCounts }),
  hobbySessionInfo: [] as HobbySessionInfo[],
  setHobbySessionInfo: (hobbySessionInfo) => set({ hobbySessionInfo }),
  hobbyColorMap: [] as HobbyColorMapType[],
  setHobbyColorMap: (hobbyColorMap) => set({ hobbyColorMap }),
  sessions: [] as ISession[],
  setSessions: (sessions) => set({ sessions }),

  //sums
  monthlySummaries: [] as MonthSums[],
  setMonthlySummaries: (monthlySummaries) => set({ monthlySummaries }),
  yearlySummaries: [] as YearSums[],
  setYearlySummaries: (yearlySummaries) => set({ yearlySummaries }),

}));