import { TotalMinutesCalc } from "@/app/actions/dashActions/totalminutescalc";
import { HobbiesInit } from "./hobbies";
import { IUser } from "@/models/types/user";
import { IUserObject } from "@/models/types/userObject";
import { ColorMapType } from "@/models/types/colorMap";
import { IFieldObject } from "@/models/types/field";
import { IIndexedEntry } from "@/models/types/entry";

export async function SetDashParams({ userInfo, month }: { userInfo: IUser, month: number }) {
    
    const { worked, sessionsFound, userObjects, colorMapBeginning, fieldObjects } = await HobbiesInit({ userInfo: userInfo }) as { worked: boolean, sessionsFound: IIndexedEntry[], userObjects: IUserObject[], colorMapBeginning: {title: string, color: string}[], fieldObjects: IFieldObject[] }


    if (!worked) {
        return { totalTimePerMonth: null, totalCounter: null, userObjects: null, sessionsFound: null, colorMap: null, fieldObjects: null }
    }

    const colorMap = colorMapBeginning ? Array.from(new Set(colorMapBeginning.map((hobby) => {

        return JSON.stringify({ color: hobby.color, title: hobby.title });
    }).filter(color => color !== null).map(color => JSON.parse(color)))) as ColorMapType[] : [];

    const { totalTimePerMonth, counterPerMonth } = await TotalMinutesCalc({ entries: sessionsFound, thisMonth: month });

    if (!totalTimePerMonth || !counterPerMonth) {
        return {totalTimePerMonth: null, totalCounter: null, userObjects: userObjects}
    }

    return {totalTimePerMonth: totalTimePerMonth, totalCounter: counterPerMonth, userObjects: userObjects, sessionsFound: sessionsFound, colorMap: colorMap, fieldObjects: fieldObjects}

}