import { TotalMinutesCalc } from "@/app/actions/dashActions/totalminutescalc";
import { IUser } from "@/models/types/user";
import { IUserObject } from "@/models/types/userObject";
import { ColorMapType } from "@/models/types/colorMap";
import { IFieldObject } from "@/models/types/field";
import { IIndexedEntry } from "@/models/types/entry";
import { HobbiesInit } from "../apihelpers/get/hobbies";

async function InitFirstObject({ userObjects }: { userObjects: IUserObject[] }) {

    if (!userObjects) {
        return {} as IUserObject
    }

    let firstObject = userObjects.find((obj) => obj.title === 'hobbies');

    if (!firstObject) {
        return {} as IUserObject
    }

    return firstObject as IUserObject;
}

export async function SetDashParams({ userInfo, month }: { userInfo: IUser, month: number }) {

    const { worked, sessionsFound, userObjects, fieldObjects, colorMap } = await HobbiesInit({ userInfo: userInfo }) as { worked: boolean, sessionsFound: IIndexedEntry[], userObjects: IUserObject[], fieldObjects: IFieldObject[], colorMap: ColorMapType[] }


    if (!worked) {
        return { totalTimePerPastFiveMonths: null, totalCounter: null, userObjects: null, sessionsFound: null, colorMap: null, fieldObjects: null, firstObject: null }
    }

    const { totalTimePerPastFiveMonths, counterPerPastFiveMonths } = await TotalMinutesCalc({ entries: sessionsFound, thisMonth: month });

    if (!totalTimePerPastFiveMonths || !counterPerPastFiveMonths) {
        return { totalTimePerPastFiveMonths: null, totalCounter: null, userObjects: userObjects, sessionsFound: null, colorMap: null, fieldObjects: null, firstObject: null }
    }


    let firstObject = await InitFirstObject({ userObjects: userObjects })

    if (!firstObject) {
        return { totalTimePerPastFiveMonths: totalTimePerPastFiveMonths, totalCounter: counterPerPastFiveMonths, userObjects: userObjects, sessionsFound: sessionsFound, colorMap: colorMap, fieldObjects: null, firstObject: null }
    }

    return { totalTimePerPastFiveMonths: totalTimePerPastFiveMonths, counterPerPastFiveMonths: counterPerPastFiveMonths, userObjects: userObjects, sessionsFound: sessionsFound, colorMap: colorMap, fieldObjects: fieldObjects, firstObject: firstObject }

}