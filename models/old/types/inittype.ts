
import { IFieldObject } from "@/models/types/field"
import { IIndexedEntry } from "./entry"
import { IUserObject } from "./userObject"
import { HobbyColorMapType } from "@/models/types/colorMap"

export type InitType = {
    totalTimePerPastFiveMonths: number[],
    counterPerPastFiveMonths: number[],
    userObjects: IUserObject[],
    sessionsFound: IIndexedEntry[],
    colorMap: HobbyColorMapType[],
    fieldObjects: IFieldObject[],
    firstObject: IUserObject
}