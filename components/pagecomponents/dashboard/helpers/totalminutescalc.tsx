import { IHobby } from "@/models/types/hobby";

export async function TotalMinutesCalc({hobbies, thisMonth}: { hobbies: IHobby[], thisMonth: number}): Promise<{totalTimePerMonth: number[], counterPerMonth: number[]}> {
    let totalTimePerMonth = [0, 0, 0, 0, 0];
    let counterPerMonth = [0, 0, 0, 0, 0];
    if (hobbies === null) {
        return Promise.resolve({totalTimePerMonth, counterPerMonth});
    }
    const calc = async () => {
        hobbies.forEach(hobby => {
            if (new Date().getMonth().toLocaleString() in hobby.dates) {
                hobby.minutesXsessions.forEach((minutes, index) => {
                    const date = new Date(hobby.dates[index]);
                    const month = date.getMonth();
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
            }
        });
    }

    await calc();

    return Promise.resolve({totalTimePerMonth, counterPerMonth});
}