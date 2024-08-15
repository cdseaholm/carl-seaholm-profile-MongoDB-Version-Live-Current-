import { IEntry } from "@/models/types/objectEntry";

export async function TotalMinutesCalc({ entries, thisMonth }: { entries: IEntry[], thisMonth: number }): Promise<{ totalTimePerMonth: number[], counterPerMonth: number[] }> {
    let totalTimePerMonth = [0, 0, 0, 0, 0];
    let counterPerMonth = [0, 0, 0, 0, 0];
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