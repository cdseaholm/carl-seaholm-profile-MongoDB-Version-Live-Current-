import { IObjectDate } from "@/models/types/objectEntryByDate";


export async function TotalMinutesCalc({ arrayOfDates, thisMonth }: { arrayOfDates: IObjectDate[], thisMonth: number }): Promise<{ totalTimePerMonth: number[], counterPerMonth: number[] }> {
    let totalTimePerMonth = [0, 0, 0, 0, 0];
    let counterPerMonth = [0, 0, 0, 0, 0];
    if (arrayOfDates === null) {
        return Promise.resolve({ totalTimePerMonth, counterPerMonth });
    }
    const calc = async () => {
        arrayOfDates.forEach((singleDateObject: IObjectDate) => {
            const date = new Date(singleDateObject.date);
            const month = date.getMonth();
            singleDateObject.entries.forEach((entry, fvIndex) => {
                if (entry.fieldValues.length === 0) {
                    return;
                }
                const fv = entry.fieldValues[fvIndex];
                if (!fv) {
                    return;
                }
                const minutes = fv?.value;
                const parsedMinutes = parseInt(minutes);
                if (isNaN(parsedMinutes)) {
                    console.error(`Invalid minutes value: ${minutes}`);
                    return;
                }
                if (month === thisMonth - 4) {
                    totalTimePerMonth[0] += parsedMinutes;
                    counterPerMonth[0]++;
                } else if (month === thisMonth - 3) {
                    totalTimePerMonth[1] += parsedMinutes;
                    counterPerMonth[1]++;
                }
                if (month === thisMonth - 2) {
                    totalTimePerMonth[2] += parsedMinutes;
                    counterPerMonth[2]++;
                }
                if (month === thisMonth - 1) {
                    totalTimePerMonth[3] += parsedMinutes;
                    counterPerMonth[3]++;
                }
                if (month === thisMonth) {
                    totalTimePerMonth[4] += parsedMinutes;
                    counterPerMonth[4]++;
                }
            });
        });

    }

    await calc();

    return Promise.resolve({ totalTimePerMonth, counterPerMonth });
}