import { ColorMapType } from "./colorMap"
import { IIndexedEntry } from "./entry"
import { IFieldObject } from "./field"
import { IUserObject } from "./userObject"

export type InitType = {
    totalTimePerMonth: number[] | null,
    totalCounter: number[] | null,
    userObjects: IUserObject[] | null,
    sessionsFound: IIndexedEntry[] | null,
    colorMap: ColorMapType[] | null,
    fieldObjects: IFieldObject[] | null,
    firstObject: IUserObject | null
}