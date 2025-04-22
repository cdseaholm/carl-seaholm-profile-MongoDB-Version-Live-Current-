import { ColorMapType } from "./colorMap"
import { IIndexedEntry } from "./entry"
import { IFieldObject } from "./field"
import { IUserObject } from "./userObject"

export type InitType = {
    totalTimePerPastFiveMonths: number[],
    counterPerPastFiveMonths: number[],
    userObjects: IUserObject[],
    sessionsFound: IIndexedEntry[],
    colorMap: ColorMapType[],
    fieldObjects: IFieldObject[],
    firstObject: IUserObject
}