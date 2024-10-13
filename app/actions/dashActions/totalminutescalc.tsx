import { IEntry } from "@/models/types/objectEntry";

export async function TotalMinutesCalc({ entries, thisMonth }: { entries: IEntry[], thisMonth: number }): Promise<{ totalTimePerMonth: number[], counterPerMonth: number[] }> {
    let totalTimePerMonth = [0, 0, 0, 0, 0] as number[];
    let counterPerMonth = [0, 0, 0, 0, 0] as number[];
    if (entries === null) {
        return Promise.resolve({ totalTimePerMonth, counterPerMonth });
    }
    const calc = async () => {
        entries.forEach((entry: IEntry) => {
            const date = new Date(entry.date);
            const month = date.getMonth();
            entry.fields.forEach((field) => {
                if (field.name !== 'session') {
                    return;
                }
                const fv = field.value;
                if (!fv) {
                    return;
                }
                const parsedMinutes = parseInt(fv);
                if (isNaN(parsedMinutes)) {
                    console.error(`Invalid minutes value: ${fv}`);
                    return;
                }
                if (month === thisMonth - 4) {
                    totalTimePerMonth[0] = (totalTimePerMonth[0] ? totalTimePerMonth[0] : 0) + parsedMinutes;
                    counterPerMonth[0] = (counterPerMonth[0] ? counterPerMonth[0] : 0) + 1;
                } else if (month === thisMonth - 3) {
                    totalTimePerMonth[1] = (totalTimePerMonth[1] ? totalTimePerMonth[1] : 0) + parsedMinutes;
                    counterPerMonth[0] = (counterPerMonth[0] ? counterPerMonth[0] : 0) + 1;
                }
                if (month === thisMonth - 2) {
                    totalTimePerMonth[2] = (totalTimePerMonth[2] ? totalTimePerMonth[2] : 0) + parsedMinutes;
                    counterPerMonth[0] = (counterPerMonth[0] ? counterPerMonth[0] : 0) + 1;
                }
                if (month === thisMonth - 1) {
                    totalTimePerMonth[3] = (totalTimePerMonth[3] ? totalTimePerMonth[3] : 0) + parsedMinutes;
                    counterPerMonth[0] = (counterPerMonth[0] ? counterPerMonth[0] : 0) + 1;
                }
                if (month === thisMonth) {
                    totalTimePerMonth[4] = (totalTimePerMonth[4] ? totalTimePerMonth[4] : 0) + parsedMinutes;
                    counterPerMonth[0] = (counterPerMonth[0] ? counterPerMonth[0] : 0) + 1;
                }
            });
        });

    }

    await calc();

    return Promise.resolve({ totalTimePerMonth, counterPerMonth });
}