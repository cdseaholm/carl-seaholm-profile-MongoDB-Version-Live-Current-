import { MonthProv } from "@/components/helpers/monthprov";
import { dataType, Tracker } from "@/components/pagecomponents/dashboard/statsView";
import { useHobbyStore } from "@/context/hobbyStore";
import { IIndexedEntry } from "@/models/types/entry";
import { IField, IFieldObject } from "@/models/types/field";
import { IUserObject } from "@/models/types/userObject";
import { IUserObjectIndexed } from "@/models/types/userObjectIndexed";
import { isSameYear, isThisYear, subYears } from "date-fns";

export type BarData = { date: string, time: number, color: string };

export async function BeginPercentage({ objectToUse, totalTime, fields, sessions }: { objectToUse: IUserObject, totalTime: number[], fields: IFieldObject[], sessions: IIndexedEntry[] }) {
    let newData = [] as dataType[];
    let calData = [] as dataType[];
    if (!objectToUse) {
        return newData;
    }

    const objectIndicies = objectToUse.indexes as IUserObjectIndexed[];
    if (!objectIndicies) {
        return newData;
    }
    if (!fields) {
        return newData;
    }

    let fieldsLength = fields.length;
    if (!fieldsLength) {
        return newData;
    }
    if (!totalTime) {
        return newData;
    }

    const reducedTime = totalTime.reduce((a: number, b: number) => a + b, 0);

    if (objectIndicies && reducedTime > 0) {
        objectIndicies.forEach((hobby: IUserObjectIndexed, _index) => {
            let title = hobby.title ? hobby.title : '';
            let realIndex = hobby.index as number;
            if (realIndex !== undefined && realIndex >= 0 && realIndex < fieldsLength) {
                const hobbyFields = fields[realIndex] as IFieldObject;
                if (hobbyFields) {
                    let specificHobbyMap = hobbyFields.fields as IField[];
                    if (specificHobbyMap) {
                        const hobbyColorIndex = specificHobbyMap.find((field) => field.name === 'color')?.values as string[];
                        let hobbyColor = '';
                        if (hobbyColorIndex && hobbyColorIndex[0]) {
                            hobbyColor = hobbyColorIndex[0];
                        }
                        let hobbyTotalMinVal = specificHobbyMap.find((field) => field.name === 'totalMinutes')?.values as string[];
                        let val = hobbyTotalMinVal ? Number(hobbyTotalMinVal[0]) : 0;
                        const entryPoint = {
                            name: title,
                            value: val / reducedTime * 100,
                            color: hobbyColor
                        } as dataType;
                        if (entryPoint) {
                            newData.push(entryPoint)
                        }
                        let sessionIndexes = hobbyFields.entryIndexes as number[];
                        if (sessionIndexes) {
                            sessionIndexes.forEach((session, _index) => {
                                let found = sessions.find((sesh, _index) => sesh.trueIndex === session)?.date;
                                if (found) {
                                    const [year, month, day] = found.split('-').map(Number);
                                    const date = new Date(year, month - 1, day);
                                    const calPoint = {
                                        name: title,
                                        value: val / reducedTime * 100,
                                        color: hobbyColor,
                                        date: date
                                    }
                                    if (calPoint) {
                                        calData.push(calPoint)
                                    }
                                }
                            })
                        }
                    }
                }
            } else {
                console.log(`Invalid realIndex: ${realIndex} for hobby: ${title}`);
            }
        });
    }

    return { newData: newData, calData: calData };
}

export async function GetDataset({ objectToUse, thisMonth, thisYear, entries, fields }: { objectToUse: IUserObject, thisMonth: number, thisYear: number, entries: IIndexedEntry[], fields: IFieldObject[] }) {
    let returnData = {} as { monthNames: string[], monthColors: string[], newData: BarData[], newDataTwo: BarData[] };
    const months = await SetMonthsFunc(thisMonth, thisYear);

    if (!objectToUse) {
        return returnData;
    }

    const { monthNames, monthColors } = await MonthProv(months) as unknown as { monthNames: string[], monthColors: string[], message: string };

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
                const [year, month, day] = entry.date.split('-').map(Number);
                const thisDate = new Date(year, month - 1, day);
                if (thisDate === null) {
                    return;
                }
                if (isThisYear(thisDate) || isSameYear(thisDate, subYears(new Date(), 1))) {
                    const dateMonth = new Date(thisDate).getMonth();
                    months.forEach((month: { month: number, year: number }, index: number) => {
                        if (entryVal !== -1 && ((month.month + 12)) % 12 === dateMonth) {
                            if (totalTimeFixedPerMonth[index] !== undefined) {
                                totalTimeFixedPerMonth[index] += entryVal;
                            }
                            if (sessionsPerMonth[index] !== undefined) {
                                sessionsPerMonth[index] += 1;
                            }
                        }
                    });
                }
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


export async function FillTracker({ thisMonth, fields, entries }: { thisMonth: number, fields: IFieldObject[], entries: IIndexedEntry[] }) {

    const objectIndicies = useHobbyStore.getState().userObjectsIndexed;

    const monthLength = new Date(new Date().getFullYear(), thisMonth + 1, 0).getDate();
    let daysWithHobbies = new Array(monthLength).fill(false);
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
                    entryIndicies.forEach((indicy: number) => {
                        indicies.push(indicy);
                    });
                }
            }
        }
    }

    const today = new Date();
    for (let i = 0; i < indicies.length; i++) {
        let currIndex = indicies[i] as number;
        if (currIndex !== undefined) {
            const dateToUse = entries[currIndex]?.date;
            if (dateToUse) {
                const [year, month, day] = dateToUse.split('-').map(Number);
                const date = new Date(year, month - 1, day);
                if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()) {
                    const dayOfMonth = date.getDate();
                    daysWithHobbies[dayOfMonth - 1] = true;
                }
            } else {
                console.log("Invalid date for index:", currIndex);
            }
        }
    }
    const newTrackerData = [] as Tracker[];
    daysWithHobbies.slice(0, today.getDate()).forEach((day) => {
        if (day === true) {
            newTrackerData.push({ color: 'green', tooltip: 'Hobby completed' });
        } else {
            newTrackerData.push({ color: 'red', tooltip: 'No hobby completed' });
        }
    });


    return { newTrackerData: newTrackerData, monthLength: monthLength };
}

export async function SetMonthsFunc(thisMonth: number, thisYear: number): Promise<{ month: number, year: number }[]> {
    const months = [] as { month: number, year: number }[];
    for (let i = 4; i >= 0; i--) {
        let month = thisMonth - i;
        let yearToUse = thisYear;
        if (month < 0) {
            month += 12;
            yearToUse = thisYear - 1;
        }
        months.push({ month: month % 12, year: yearToUse });
    }
    return months;
}