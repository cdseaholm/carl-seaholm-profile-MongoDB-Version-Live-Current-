import { BarData } from "@/app/actions/statsActions/statActions"

export type DataSets = {
    monthNames: string[],
    monthColors: string[],
    newData: BarData[],
    newDataTwo: BarData[]
}