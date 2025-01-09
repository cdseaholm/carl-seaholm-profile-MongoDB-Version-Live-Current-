import { TotalMinutesCalc } from "@/app/actions/dashActions/totalminutescalc";
import { HobbiesInit } from "./hobbies";
import { IUser } from "@/models/types/user";
import { IUserObject } from "@/models/types/userObject";
import { ColorMapType } from "@/models/types/colorMap";
import { IFieldObject } from "@/models/types/field";
import { IIndexedEntry } from "@/models/types/entry";

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

    const { worked, sessionsFound, userObjects, colorMapBeginning, fieldObjects } = await HobbiesInit({ userInfo: userInfo }) as { worked: boolean, sessionsFound: IIndexedEntry[], userObjects: IUserObject[], colorMapBeginning: { title: string, color: string }[], fieldObjects: IFieldObject[] }


    if (!worked) {
        return { totalTimePerMonth: null, totalCounter: null, userObjects: null, sessionsFound: null, colorMap: null, fieldObjects: null, firstObject: null }
    }

    if (!userObjects) {
        return { totalTimePerMonth: null, totalCounter: null, userObjects: userObjects, sessionsFound: null, colorMap: null, fieldObjects: null, firstObject: null }
    }

    const colorMap = colorMapBeginning ? Array.from(new Set(colorMapBeginning.map((hobby) => {

        return JSON.stringify({ color: hobby.color, title: hobby.title });
    }).filter(color => color !== null).map(color => JSON.parse(color)))) as ColorMapType[] : [];

    const { totalTimePerMonth, counterPerMonth } = await TotalMinutesCalc({ entries: sessionsFound, thisMonth: month });

    if (!totalTimePerMonth || !counterPerMonth) {
        return { totalTimePerMonth: null, totalCounter: null, userObjects: userObjects, sessionsFound: null, colorMap: null, fieldObjects: null, firstObject: null }
    }


    let firstObject = await InitFirstObject({ userObjects: userObjects })

    if (!firstObject) {
        return { totalTimePerMonth: totalTimePerMonth, totalCounter: counterPerMonth, userObjects: userObjects, sessionsFound: sessionsFound, colorMap: colorMap, fieldObjects: null, firstObject: null }
    }

    return { totalTimePerMonth: totalTimePerMonth, totalCounter: counterPerMonth, userObjects: userObjects, sessionsFound: sessionsFound, colorMap: colorMap, fieldObjects: fieldObjects, firstObject: firstObject }

}