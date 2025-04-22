import { BarData } from "@/app/actions/statsActions/statActions"

export type BarDataSets = {
    monthNames: string[],
    monthColors: string[],
    newData: BarData[],
    newDataTwo: BarData[]
}