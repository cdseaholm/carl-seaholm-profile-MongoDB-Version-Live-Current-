import { MonthProv } from "@/components/helpers/monthprov";
import { dataType, Tracker } from "@/components/pagecomponents/dashboard/statsView";
import { IIndexedEntry } from "@/models/types/entry";
import { IField, IFieldObject } from "@/models/types/field";
import { IUserObject } from "@/models/types/userObject";
import { IUserObjectIndexed } from "@/models/types/userObjectIndexed";

export type BarData = { date: string, time: number, color: string };

export async function BeginPercentage({ objectToUse, totalTime, entries, fields }: { objectToUse: IUserObject, totalTime: number[], entries: IIndexedEntry[], fields: IFieldObject[] }) {
    let newData = [] as dataType[];
    const objectIndicies = objectToUse ? objectToUse.indexes as IUserObjectIndexed[] : [] as IUserObjectIndexed[]
    const reducedTime = totalTime.reduce((a: number, b: number) => a + b);
    if (objectIndicies && reducedTime > 0) {

        objectIndicies.forEach((hobby: IUserObjectIndexed) => {
            let title = hobby.title ? hobby.title : '';
            const hobbyFields = fields[hobby.index] as IFieldObject;
            let hobbyColorMap = hobbyFields.fields as IField[]
            const hobbyColorIndex = hobbyColorMap.find((field) => field.name === 'color')?.values as string[];
            const hobbyColor = hobbyColorIndex ? hobbyColorIndex[0] : '';
            const entryIndicies = hobbyFields.entryIndexes as number[];
            entryIndicies.forEach((indicy) => {
                const entry = entries[indicy] as IIndexedEntry
                const entryVal = entry ? entry.value as number : -1;
                const entryDate = entry ? entry.date as string : null;
                if (entryVal !== -1 && entryDate !== null) {
                    const entryPoint = {
                        name: title,
                        value: entryVal / reducedTime * 100,
                        color: hobbyColor,
                        date: entryDate
                    } as dataType;
                    newData = [...newData, entryPoint] as dataType[]
                }
            })
        })
    }

    return newData;
}

export async function GetDataset({ objectToUse, thisMonth, entries, fields }: { objectToUse: IUserObject, thisMonth: number, entries: IIndexedEntry[], fields: IFieldObject[] }) {
    let returnData = {} as { monthNames: string[], monthColors: string[], newData: BarData[], newDataTwo: BarData[] };
    const years = new Date().getFullYear();
    const months = await SetMonthsFunc(thisMonth);

    if (!objectToUse) {
        return returnData;
    }

    const { monthNames, monthColors } = await MonthProv(months, years) as unknown as { monthNames: string[], monthColors: string[] };

    if (!monthColors || !monthNames) {
        return returnData;
    }

    const barMonths = monthNames.map((month) => {
        return month;
    });
    const barColors = monthColors.map((color) => {
        return color;
    });

    if (!barMonths || !barColors) {
        return returnData;
    }

    let totalTimeFixedPerMonth = [0, 0, 0, 0, 0] as number[];
    let sessionsPerMonth = [0, 0, 0, 0, 0] as number[];

    const objectIndicies = objectToUse ? objectToUse.indexes as IUserObjectIndexed[] : [] as IUserObjectIndexed[];
    if (objectIndicies) {
        objectIndicies.forEach((hobby: IUserObjectIndexed) => {
            const hobbyFields = fields[hobby.index] as IFieldObject;
            const entryIndicies = hobbyFields.entryIndexes as number[];
            entryIndicies.forEach((indicy) => {
                const entry = entries[indicy] as IIndexedEntry;
                const entryVal = entry ? Number(entry.value) as number : -1;
                const thisDate = entry ? entry.date as string : null;
                if (thisDate === null) {
                    return;
                }
                const dateMonth = new Date(thisDate).getMonth();
                months.forEach((month: number, index: number) => {
                    if (entryVal !== -1 && month === dateMonth) {
                        if (totalTimeFixedPerMonth[index] !== undefined) {
                            totalTimeFixedPerMonth[index] += entryVal;
                        }
                        if (sessionsPerMonth[index] !== undefined) {
                            sessionsPerMonth[index] += 1;
                        }
                    }
                });
            });
        });
    }

    const avgTotalTimeFixed = totalTimeFixedPerMonth.map((time, index) => {
        let thisMonthsSeshs = sessionsPerMonth[index] as number;
        if (thisMonthsSeshs === 0) {
            return 0;
        }
        return parseFloat((time / thisMonthsSeshs).toFixed(2));
    });

    const newData = monthNames ? monthNames.map((mnth: string, index: number) => {
        const total = totalTimeFixedPerMonth[index] as number;
        return {
            date: mnth,
            time: total ? total : 0,
            color: monthColors[index],
        };
    }) as { date: string, time: number, color: string }[] : [];

    const newDataTwo = monthNames ? monthNames.map((mnth: string, index: number) => {
        const total = avgTotalTimeFixed[index] as number;
        return {
            date: mnth,
            time: total ? total : 0,
            color: monthColors[index],
        };
    }) as { date: string, time: number, color: string }[] : [];

    returnData = { monthNames: barMonths, monthColors: barColors, newData, newDataTwo };

    return returnData;
}


export async function FillTracker({ objectToUse, thisMonth, fields, entries }: { objectToUse: IUserObject, thisMonth: number, fields: IFieldObject[], entries: IIndexedEntry[] }) {

    if (!objectToUse) {
        return;
    }
    let objectIndicies = objectToUse.indexes as IUserObjectIndexed[]
    if (!objectIndicies) {
        return;
    }

    let daysWithHobbies = [] as number[];
    const monthLength = new Date(new Date().getFullYear(), thisMonth + 1, 0).getDate();
    let indicies = [] as number[]
    for (let i = 0; i < objectIndicies.length; i++) {
        let spec = objectIndicies[i] as IUserObjectIndexed
        let index = -1
        if (spec) {
            index = spec.index;
        }
        if (index !== -1) {
            let specificField = fields[index];
            if (specificField) {
                let entryIndicies = specificField.entryIndexes;
                if (entryIndicies) {
                    entryIndicies.map((indicy: number, _index: number) => {
                        indicies = [...indicies, indicy]
                    })
                }
            }
        }
    }

    for (let i = 0; i < indicies.length; i++) {
        let currIndex = indicies[i] as number;
        if (currIndex !== undefined) {
            const dateToUse = entries[currIndex]?.date as string;
            if (dateToUse) {
                const date = new Date(dateToUse);
                const currMonth = date.getMonth();
                if (currMonth === thisMonth) {

                    const day = date.getDate();
                    if (!daysWithHobbies.includes(day)) {
                        daysWithHobbies.push(day);
                    }
                }
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

    return { newTrackerData: newTrackerData, daysWithHobbies: daysWithHobbies, monthLength: monthLength };
}

export async function SetMonthsFunc(thisMonth: number): Promise<number[]> {
    const months = [thisMonth - 4, thisMonth - 3, thisMonth - 2, thisMonth - 1, thisMonth] as number[];
    return months;
}