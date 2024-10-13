import { MonthProv } from "@/components/helpers/monthprov";
import { dataType, Tracker } from "@/components/pagecomponents/dashboard/statsView";
import { IEntry } from "@/models/types/objectEntry";
import { IUserObject } from "@/models/types/userObject";

export type BarData = { date: string, time: number, color: string };

export async function BeginPercentage({ objectToUse, objectTitle, reducedTime }: { objectToUse: IUserObject, objectTitle: string, reducedTime: number }) {
    let newData = [] as dataType[];
    let colorsLocal = [] as string[];
    const setColorMap = async () => {
        if (objectToUse && objectToUse.entries.length > 0) {
            let newColors = [] as string[];
            for (let i = 0; i < objectToUse.entries.length; i++) {
                const colorToAdd = objectToUse.entries[i]?.fields.find(field => field.name === 'color')?.value;
                if (!colorToAdd) {
                    return;
                }
                if (colorToAdd in newColors) {
                    return
                }
                newColors.push(colorToAdd);
            }
            colorsLocal = newColors;
        }
    }
    if (objectToUse && reducedTime > 0) {
        await setColorMap();
        newData = objectToUse.entries.map((entry: IEntry, index: number) => {
            return {
                name: entry.fields.find(field => field.name === `${objectTitle}Entry`)?.value,
                value: entry.fields.find(field => field.name === 'session')?.value / reducedTime * 100,
                color: colorsLocal[index]
            }
        }) as dataType[];
    }
    return newData;
}

export async function GetDataset({ objectToUse, totalTime, totalCounter, thisMonth }: { objectToUse: IUserObject, totalTime: number[], totalCounter: number[], thisMonth: number }) {
    let returnData = {} as { monthNames: string[], monthColors: string[], newData: BarData[], newDataTwo: BarData[] };
    const years = new Date().getFullYear();
    const months = await SetMonthsFunc(thisMonth);

    if (objectToUse) {
        if (totalTime !== undefined) {
            const { monthNames, monthColors } = await MonthProv(months, years) as unknown as { monthNames: string[], monthColors: string[] };
            const totalTimeFixed = totalTime.map((time) => {
                return time;
            });
            const avgTotalTimeFixed = totalTime.map((time, index) => {
                return parseFloat((time / (totalCounter[index] ?? 1)).toFixed(2));
            });
            if (monthNames === undefined || monthColors === undefined) {
                return Promise.resolve();
            }
            const barMonths = monthNames.map((month) => {
                return month;
            });
            const barColors = monthColors.map((color) => {
                return color;
            });

            const entries = objectToUse ? objectToUse.entries as IEntry[] : [] as IEntry[];

            const newData = entries ? entries.map((_field, index) => {
                if (monthNames !== undefined && monthColors !== undefined) {
                    const total = totalTimeFixed[index];
                    return {
                        date: monthNames[index],
                        time: total === 0 || total === undefined || total === null ? 0 : total,
                        color: monthColors[index],
                    };
                }
                return {
                    date: '',
                    time: 0,
                    color: ''
                };
            }) as { date: string, time: number, color: string }[] : [];

            const newDataTwo = entries ? entries.map((_field, index) => {
                if (monthNames !== undefined && monthColors !== undefined) {
                    const total = avgTotalTimeFixed[index];
                    return {
                        date: monthNames[index],
                        time: total === 0 || total === undefined || total === null ? 0 : total,
                        color: monthColors[index],
                    };
                }
                return {
                    date: '',
                    time: 0,
                    color: ''
                };
            }) as { date: string, time: number, color: string }[] : [];
            returnData = { monthNames: barMonths, monthColors: barColors, newData, newDataTwo };
        }
    } else {
        return returnData;
    }
    return returnData;
}

export async function FillTracker({ objectToUse, thisMonth }: { objectToUse: IUserObject, thisMonth: number }) {

    let daysWithHobbies = [] as number[];
    const entries = objectToUse ? objectToUse.entries as IEntry[] : [] as IEntry[];
    const monthLength = new Date(new Date().getFullYear(), thisMonth, 0).getDate();
    const entLen = entries ? entries.length : 0;
    if (!objectToUse) {
        return;
    }
    for (let i = 0; i < entLen; i++) {
        const dateToUse = objectToUse.entries[i]?.date as string;
        const date = new Date(dateToUse);
        if (date.getMonth() === thisMonth) {
            const day = date.getDate();
            if (!daysWithHobbies.includes(day)) {
                daysWithHobbies.push(day);
            }
        }
    }
    const newTrackerData = [] as Tracker[];
    for (let i = 1; i <= monthLength; i++) {
        if (daysWithHobbies?.includes(i)) {
            newTrackerData.push({ color: 'green', tooltip: 'Hobby completed' });
        } else {
            newTrackerData.push({ color: 'red', tooltip: 'No hobby completed' });
        }
    }

    return {newTrackerData: newTrackerData, daysWithHobbies: daysWithHobbies, monthLength: monthLength};
}

export async function SetMonthsFunc(thisMonth: number): Promise<number[]> {
    const months = [thisMonth - 4, thisMonth - 3, thisMonth - 2, thisMonth - 1, thisMonth] as number[];
    return months;
}