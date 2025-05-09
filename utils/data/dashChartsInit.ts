import { BeginPercentage, GetDataset, FillTracker, BarData } from "@/app/actions/statsActions/statActions";
import { dataType, Tracker } from "@/components/pagecomponents/dashboard/statsView";
import { IIndexedEntry } from "@/models/types/entry";
import { IFieldObject } from "@/models/types/field";
import { IUser } from "@/models/types/user";
import { IUserObject } from "@/models/types/userObject";
import { EntriesOTDType } from "@/models/types/otds";
import { PercentageByHobbiesData } from "@/models/types/percentage";
import { BarDataSets } from "@/models/types/dataSets";
import { MonthlyTrackerData } from "@/models/types/tracker";
import { TransformedDashProps, useStore } from "@/context/dataStore";
import { useHobbyStore } from "@/context/hobbyStore";
import { InitCategories } from "../apihelpers/get/initCategories";

export type InitializedData = {
    ents: EntriesOTDType[];
    perc: { newData: dataType[], calData: dataType[] };
    dataSet: { monthNames: string[]; monthColors: string[]; newData: BarData[]; newDataTwo: BarData[]; };
    tracker: { newTrackerData: Tracker[]; daysWithHobbies: number[]; monthLength: number; };
    setModalData: { categories: string[]; titles: string[]; };
}

export default async function DashChartsInit({ thisMonth, totalTimePerMonth, sessionsFound, fieldObjects, objectToUse, thisYear }: {
    userInfo: IUser,
    thisMonth: number,
    totalTimePerMonth: number[],
    sessionsFound: IIndexedEntry[],
    fieldObjects: IFieldObject[],
    objectToUse: IUserObject,
    thisYear: number
}) {

    try {

        const percentageByHobbies = await BeginPercentage({ objectToUse: objectToUse, totalTime: totalTimePerMonth, fields: fieldObjects, sessions: sessionsFound }) as PercentageByHobbiesData;

        if (!percentageByHobbies) {
            return { status: false, message: 'perc error' }
        }

        const barDataSets = await GetDataset({ objectToUse: objectToUse, thisMonth: thisMonth, thisYear: thisYear, fields: fieldObjects, entries: sessionsFound }) as BarDataSets;

        if (!barDataSets) {
            return { status: false, message: 'dataSet error' }
        }

        const monthlyTracker = await FillTracker({ thisMonth: thisMonth, entries: sessionsFound, fields: fieldObjects }) as MonthlyTrackerData;

        if (!monthlyTracker) {
            return { status: false, message: 'tracker error' }
        }

        let reTransformedDashProps = { percentageByHobbies: percentageByHobbies, barDataSets: barDataSets, monthlyTracker: monthlyTracker } as TransformedDashProps;

        useStore.getState().setTransformedDashProps(reTransformedDashProps);

        const setModalData = await InitCategories({ objectToUse: objectToUse, fieldObjects: fieldObjects }) as { categories: string[]; titles: string[]; }

        if (!setModalData) {
            return { status: false, message: 'setModalData error' }
        }

        useHobbyStore.getState().setTitles(setModalData.titles);
        useHobbyStore.getState().setCategories(setModalData.categories);

        return { status: true, message: `Success` }

    } catch (error: any) {
        return { status: false, message: `Error catch: ${error}` }
    }

}