import { useHobbyStore } from "@/context/hobbyStore";
import { IIndexedEntry } from "@/models/types/entry";
import { isSameYear, isThisYear, subYears } from "date-fns";


export async function TotalMinutesCalc({ entries, thisMonth }: { entries: IIndexedEntry[], thisMonth: number }): Promise<{ totalTimePerPastFiveMonths: number[], counterPerPastFiveMonths: number[] }> {

    let totalTimePerPastFiveMonths = [0, 0, 0, 0, 0] as number[];
    let counterPerPastFiveMonths = [0, 0, 0, 0, 0] as number[];

    if (entries === null) {
        return Promise.resolve({ totalTimePerPastFiveMonths, counterPerPastFiveMonths });
    }
    if (thisMonth < 0 || thisMonth === null || thisMonth === undefined) {
        return Promise.resolve({ totalTimePerPastFiveMonths, counterPerPastFiveMonths })
    }

    entries.forEach((entry: IIndexedEntry) => {
        const [year, month, day] = entry.date.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        const entryValue = entry.value;
        if (!entryValue) {
            return;
        }
        const parsedMinutes = parseInt(entryValue);
        if (isNaN(parsedMinutes)) {
            console.error(`Invalid minutes value: ${entryValue}`);
            return;
        }
        if (isThisYear(date) || isSameYear(date, subYears(new Date(), 1))) {
            if (month === (((thisMonth + 12) - 4)) % 12) {
                totalTimePerPastFiveMonths[0] = (totalTimePerPastFiveMonths[0] ? totalTimePerPastFiveMonths[0] : 0) + parsedMinutes;
                counterPerPastFiveMonths[0] = (counterPerPastFiveMonths[0] ? counterPerPastFiveMonths[0] : 0) + 1;
            } else if (month === (((thisMonth + 12) - 3)) % 12) {
                totalTimePerPastFiveMonths[1] = (totalTimePerPastFiveMonths[1] ? totalTimePerPastFiveMonths[1] : 0) + parsedMinutes;
                counterPerPastFiveMonths[0] = (counterPerPastFiveMonths[0] ? counterPerPastFiveMonths[0] : 0) + 1;
            }
            if (month === (((thisMonth + 12) - 2)) % 12) {
                totalTimePerPastFiveMonths[2] = (totalTimePerPastFiveMonths[2] ? totalTimePerPastFiveMonths[2] : 0) + parsedMinutes;
                counterPerPastFiveMonths[0] = (counterPerPastFiveMonths[0] ? counterPerPastFiveMonths[0] : 0) + 1;
            }
            if (month === (((thisMonth + 12) - 1)) % 12) {
                totalTimePerPastFiveMonths[3] = (totalTimePerPastFiveMonths[3] ? totalTimePerPastFiveMonths[3] : 0) + parsedMinutes;
                counterPerPastFiveMonths[0] = (counterPerPastFiveMonths[0] ? counterPerPastFiveMonths[0] : 0) + 1;
            }
            if (month === ((thisMonth + 12)) % 12) {
                totalTimePerPastFiveMonths[4] = (totalTimePerPastFiveMonths[4] ? totalTimePerPastFiveMonths[4] : 0) + parsedMinutes;
                counterPerPastFiveMonths[0] = (counterPerPastFiveMonths[0] ? counterPerPastFiveMonths[0] : 0) + 1;
            }
        }
    });

    useHobbyStore.getState().setCounterPerPastFiveMonths(counterPerPastFiveMonths);
    useHobbyStore.getState().setTotalTimePastFiveMonths(totalTimePerPastFiveMonths);

    return Promise.resolve({ totalTimePerPastFiveMonths, counterPerPastFiveMonths });
}