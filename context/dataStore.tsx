import { create } from 'zustand';
import { IUser } from '@/models/types/user';
import { IUserObject } from '@/models/types/userObject';
import { IIndexedEntry } from '@/models/types/entry';
import { ColorMapType } from '@/models/types/colorMap';
import { IFieldObject } from '@/models/types/field';
import { EntriesOTDType } from '@/models/types/otds';
import { DataSets } from '@/models/types/dataSets';
import { TrackerData } from '@/models/types/tracker';
import { PercentageData } from '@/models/types/percentage';

export type DashProps = {
  userInfo: IUser;
  colorMap: ColorMapType[];
  fieldObjects: IFieldObject[];
  objectToUse: IUserObject;
  sessionsFound: IIndexedEntry[];
  totalTimePerMonth: number[];
  userObjects: IUserObject[];
}

export type TransformedDashProps = {
  entriesOTD: EntriesOTDType[];
  percentage: PercentageData;
  trackerData: TrackerData;
  dataSet: DataSets;
}

type Store = {
  dashProps: DashProps;
  setDashProps: (dashProps: DashProps) => void;
  thisMonth: number;
  setThisMonth: (thisMonth: number) => void;
  daySelected: string;
  setDaySelected: (daySelected: string) => void;
  transformedDashProps: TransformedDashProps;
  setTransformedDashProps: (transformedDashProps: TransformedDashProps) => void;
};

export const useStore = create<Store>((set) => ({
  dashProps: {} as DashProps,
  setDashProps: (dashProps) => set({dashProps}),
  thisMonth: new Date().getMonth() as number,
  setThisMonth: (thisMonth) => set({ thisMonth }),
  daySelected: new Date().toLocaleDateString() as string,
  setDaySelected: (daySelected) => set({ daySelected }),
  transformedDashProps: {} as TransformedDashProps,
  setTransformedDashProps: (transformedDashProps) => set({transformedDashProps})
}));