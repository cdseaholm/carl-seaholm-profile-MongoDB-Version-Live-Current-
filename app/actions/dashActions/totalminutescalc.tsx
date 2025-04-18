import { IIndexedEntry } from "@/models/types/entry";
import { isSameYear, isThisYear, subYears } from "date-fns";


export async function TotalMinutesCalc({ entries, thisMonth }: { entries: IIndexedEntry[], thisMonth: number }): Promise<{ totalTimePerMonth: number[], counterPerMonth: number[] }> {
    let totalTimePerMonth = [0, 0, 0, 0, 0] as number[];
    let counterPerMonth = [0, 0, 0, 0, 0] as number[];
    if (entries === null) {
        return Promise.resolve({ totalTimePerMonth, counterPerMonth });
    }
    if (thisMonth < 0 || thisMonth === null || thisMonth === undefined) {
        return Promise.resolve({ totalTimePerMonth, counterPerMonth })
    }
    entries.forEach((entry: IIndexedEntry) => {
        const date = new Date(entry.date);
        const month = date.getMonth();
        const fv = entry.value;
        if (!fv) {
            return;
        }
        const parsedMinutes = parseInt(fv);
        if (isNaN(parsedMinutes)) {
            console.error(`Invalid minutes value: ${fv}`);
            return;
        }
        if (isThisYear(date) || isSameYear(date, subYears(new Date(), 1))) {
            if (month === (((thisMonth + 12) - 4)) % 12) {
                totalTimePerMonth[0] = (totalTimePerMonth[0] ? totalTimePerMonth[0] : 0) + parsedMinutes;
                counterPerMonth[0] = (counterPerMonth[0] ? counterPerMonth[0] : 0) + 1;
            } else if (month === (((thisMonth + 12) - 3)) % 12) {
                totalTimePerMonth[1] = (totalTimePerMonth[1] ? totalTimePerMonth[1] : 0) + parsedMinutes;
                counterPerMonth[0] = (counterPerMonth[0] ? counterPerMonth[0] : 0) + 1;
            }
            if (month === (((thisMonth + 12) - 2)) % 12) {
                totalTimePerMonth[2] = (totalTimePerMonth[2] ? totalTimePerMonth[2] : 0) + parsedMinutes;
                counterPerMonth[0] = (counterPerMonth[0] ? counterPerMonth[0] : 0) + 1;
            }
            if (month === (((thisMonth + 12) - 1)) % 12) {
                totalTimePerMonth[3] = (totalTimePerMonth[3] ? totalTimePerMonth[3] : 0) + parsedMinutes;
                counterPerMonth[0] = (counterPerMonth[0] ? counterPerMonth[0] : 0) + 1;
            }
            if (month === ((thisMonth + 12)) % 12) {
                totalTimePerMonth[4] = (totalTimePerMonth[4] ? totalTimePerMonth[4] : 0) + parsedMinutes;
                counterPerMonth[0] = (counterPerMonth[0] ? counterPerMonth[0] : 0) + 1;
            }
        }
    });

    return Promise.resolve({ totalTimePerMonth, counterPerMonth });
}