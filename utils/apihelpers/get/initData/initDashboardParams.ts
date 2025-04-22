import { DashProps, useStore } from "@/context/dataStore";
import { ColorMapType } from "@/models/types/colorMap";
import { IIndexedEntry } from "@/models/types/entry";
import { IFieldObject } from "@/models/types/field";
import { InitType } from "@/models/types/inittype";
import { IUser } from "@/models/types/user";
import { IUserObject } from "@/models/types/userObject";
import DashChartsInit from "@/utils/data/dashChartsInit";
import { SetDashParams } from "@/utils/data/stats";

export default async function InitDashboardProps({ userInfo, thisMonth }: { userInfo: IUser, thisMonth: number }) {
    const thisYear = new Date().getFullYear();

    const timeData = await SetDashParams({ userInfo: userInfo, month: thisMonth }) as InitType;

    if (!timeData) {
        return { status: false, message: 'Error initializing timeData' };
    }


    const totalTimePerMonth = timeData.totalTimePerPastFiveMonths ? timeData.totalTimePerPastFiveMonths : [] as number[];
    const userObjects = timeData.userObjects ? timeData.userObjects : [] as IUserObject[];
    const sessionsFound = timeData.sessionsFound ? timeData.sessionsFound : [] as IIndexedEntry[];
    const colorMap = timeData.colorMap ? timeData.colorMap : [] as ColorMapType[];
    const fieldObjects = timeData.fieldObjects ? timeData.fieldObjects : [] as IFieldObject[];
    const objectToUse = timeData.firstObject ? timeData.firstObject : {} as IUserObject;

    const newDashProps = { userInfo: userInfo, totalTimePerMonth: totalTimePerMonth, userObjects: userObjects, sessionsFound: sessionsFound, colorMap: colorMap, fieldObjects: fieldObjects, objectToUse: objectToUse } as DashProps;

    if (!newDashProps) {
        return { status: false, message: 'Error initializing newDashProps' };
    }

    const initialized = await DashChartsInit({ userInfo, thisMonth, totalTimePerMonth, sessionsFound, fieldObjects, objectToUse, thisYear }) as { status: boolean, message: string };

    if (!initialized) {
        return { status: false, message: 'Error initializing initialized' };
    }

    if (initialized.status !== true) {
        return { status: false, message: 'False initialized' };
    }

    useStore.getState().setDashProps(newDashProps);

    return { status: true, message: 'Success' };
}