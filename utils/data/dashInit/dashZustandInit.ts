import { BeginPercentage, GetDataset, FillTracker, BarData } from "@/app/actions/statsActions/statActions";
import { dataType, Tracker } from "@/components/pagecomponents/dashboard/statsView";
import { ColorMapType } from "@/models/types/colorMap";
import { IIndexedEntry } from "@/models/types/entry";
import { IFieldObject } from "@/models/types/field";
import { IUser } from "@/models/types/user";
import { IUserObject } from "@/models/types/userObject";
import { InitCategories } from "../initCategories"
import { OfTheDays } from "../initOTDs";
import { EntriesOTDType } from "@/models/types/otds";
import { PercentageData } from "@/models/types/percentage";
import { DataSets } from "@/models/types/dataSets";
import { TrackerData } from "@/models/types/tracker";

export type InitializedData = {
    ents: EntriesOTDType[];
    perc: { newData: dataType[], calData: dataType[] };
    dataSet: { monthNames: string[]; monthColors: string[]; newData: BarData[]; newDataTwo: BarData[]; };
    tracker: { newTrackerData: Tracker[]; daysWithHobbies: number[]; monthLength: number; };
    setModalData: { categories: string[]; titles: string[]; };
}

export default async function DashZustandInit({ thisMonth, daySelected, totalTimePerMonth, userObjects, sessionsFound, fieldObjects, objectToUse }: {
    userInfo: IUser,
    thisMonth: number,
    daySelected: string,
    totalTimePerMonth: number[],
    userObjects: IUserObject[],
    sessionsFound: IIndexedEntry[],
    colorMap: ColorMapType[],
    fieldObjects: IFieldObject[],
    objectToUse: IUserObject
}) {

    let ents = [] as EntriesOTDType[];
    let perc = {} as PercentageData
    let dataSet = {} as DataSets
    let tracker = {} as TrackerData
    let setModalData = {} as { categories: string[]; titles: string[]; }

    try {
        const newEnts = await OfTheDays({ objectToUse: objectToUse, sessionsFound: sessionsFound, userObjects: userObjects, daySelected: daySelected, fieldObjects: fieldObjects }) as EntriesOTDType[];

        if (newEnts) {
            ents = [...newEnts] as EntriesOTDType[];
        }

        const newPerc = await BeginPercentage({ objectToUse: objectToUse, totalTime: totalTimePerMonth, fields: fieldObjects, sessions: sessionsFound }) as { newData: dataType[], calData: dataType[] };

        if (newPerc) {
            perc = {...newPerc} as PercentageData;
        }

        const newDataSet = await GetDataset({ objectToUse: objectToUse, thisMonth: thisMonth, fields: fieldObjects, entries: sessionsFound }) as { monthNames: string[]; monthColors: string[]; newData: BarData[]; newDataTwo: BarData[]; };

        if (newDataSet) {
            dataSet = {...newDataSet} as DataSets;
        }

        const newTracker = await FillTracker({ objectToUse: objectToUse, thisMonth: thisMonth, entries: sessionsFound, fields: fieldObjects }) as { newTrackerData: Tracker[]; daysWithHobbies: number[]; monthLength: number; };

        if (newTracker) {
            tracker = {...newTracker} as TrackerData;
        }

        const newSetModalData = await InitCategories({ objectToUse: objectToUse, fieldObjects: fieldObjects }) as { categories: string[]; titles: string[]; }

        if (newSetModalData) {
            setModalData = {...newSetModalData};
        }
    } catch (error: any) {
        console.log(error);
        return {ents: ents, perc: perc, dataSet: dataSet, tracker: tracker, setModalData: setModalData} as InitializedData;
    }

    return {ents: ents, perc: perc, dataSet: dataSet, tracker: tracker, setModalData: setModalData} as InitializedData;
}