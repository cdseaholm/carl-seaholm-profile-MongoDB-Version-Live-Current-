import { create } from 'zustand';
import { HobbyColorMapType } from '@/models/types/colorMap';
import { PercentageType } from '@/app/(content)/dashboard/components/statsView';
import { MonthSums, YearSums } from '@/app/actions/statsActions/statActions';
import { PieChartCell } from '@mantine/charts';
import { ISession } from '@/models/types/session';
import { HobbySessionInfo, MonthlyInfo } from '@/utils/apihelpers/get/initData/initDashboardParams';
import { IHobbyData } from '@/models/types/hobbyData';
import { IMonthlyData } from '@/models/types/monthlyData';
import { DateValue } from '@mantine/dates';
import { HobbyCheckMarkType } from '@/app/(content)/dashboard/components/button-board/left-board/left-board';
import { EditSessionType } from '@/models/types/edit-session';

export type DateRangeType = {
  type: 'range' | 'day' | 'month' | 'year',
  range: [DateValue | null, DateValue | null]
};

const today = new Date();
const minusFiveMonths = new Date();
minusFiveMonths.setMonth(today.getMonth() - 5);

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

  //init data states
  hobbyData: IHobbyData[]
  setHobbyData: (hobbyData: IHobbyData[]) => void;
  monthlyData: IMonthlyData[]
  setMonthlyData: (monthlyData: IMonthlyData[]) => void;

  //filteringInfo
  filteredDates: DateRangeType;
  setFilteredDates: (filteredDates: DateRangeType) => void;
  filteredHobbies: HobbyCheckMarkType[];
  setFilteredHobbies: (filteredHobbies: HobbyCheckMarkType[]) => void;

  //editing sessions
  openEditSessionModal: boolean;
  setOpenEditSessionModal: (openEditSessionModal: boolean) => void;
  sessionToEdit: EditSessionType | null;
  setSessionToEdit: (sessionToEdit: EditSessionType | null) => void;

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

  //init data states
  hobbyData: [] as IHobbyData[],
  setHobbyData: (hobbyData) => set({ hobbyData }),
  monthlyData: [] as IMonthlyData[],
  setMonthlyData: (monthlyData) => set({ monthlyData }),

  //filteringInfo

  filteredDates: { type: 'range', range: [minusFiveMonths, today] } as DateRangeType,
  setFilteredDates: (filteredDates) => set({ filteredDates }),
  filteredHobbies: [] as HobbyCheckMarkType[],
  setFilteredHobbies: (filteredHobbies) => set({ filteredHobbies }),

  //editing sessions
  openEditSessionModal: false,
  setOpenEditSessionModal: (openEditSessionModal) => set({ openEditSessionModal }),
  sessionToEdit: null as EditSessionType | null,
  setSessionToEdit: (sessionToEdit) => set({ sessionToEdit })

}));

