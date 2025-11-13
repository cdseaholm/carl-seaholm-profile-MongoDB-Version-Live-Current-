export type AllSessions = {
    hobbyTitle: string;
    hobbyColor: string;
    date: string;
    minutes: number;
    month: number;
    year: number;
}

export type MonthSums = {
    year: number;
    month: number;
    totalMinutes: number;
    totalSessions: number;
}

export type YearSums = {
    year: number;
    totalMinutes: number;
    totalSessions: number;
}

//export type BarData = { date: string, time: number, color: string };

// export async function BeginPercentage({ allTimeHobbyData }: { allTimeHobbyData: InitAllHobbyData[] }) {

//     const allSessions = [] as AllSessions[];
//     const allHobbiesSums = [] as HobbySums[];
//     const allMonthsSums = [] as MonthSums[];
//     const allYearsSums = [] as YearSums[];

//     if (!allTimeHobbyData || allTimeHobbyData.length === 0) {
//         return [] as PercentageType[];
//     };
//     allTimeHobbyData.forEach((hobby) => {

//         hobby.counts.forEach((monthData) => {

//             monthData.sessionCounts.forEach((sessionCount) => {
//                 sessionCount.sessions.forEach((session) => {
//                     allSessions.push({
//                         hobbyTitle: hobby.hobbyData.title,
//                         hobbyColor: hobby.hobbyData.color,
//                         date: session.date,
//                         minutes: session.time,
//                         month: monthData.month,
//                         year: monthData.year
//                     });
//                     // Sum by hobby
//                     let hobbySum = allHobbiesSums.find(h => h.hobbyTitle === hobby.hobbyData.title);
//                     if (!hobbySum) {
//                         hobbySum = {
//                             hobbyTitle: hobby.hobbyData.title,
//                             hobbyColor: hobby.hobbyData.color,
//                             totalMinutes: 0,
//                             totalSessions: 0
//                         };
//                         allHobbiesSums.push(hobbySum);
//                     }
//                     hobbySum.totalMinutes += session.time;
//                     hobbySum.totalSessions += 1;
//                     // Sum by month
//                     let monthSum = allMonthsSums.find(m => m.month === monthData.month);
//                     if (!monthSum) {
//                         monthSum = {
//                             month: monthData.month,
//                             totalMinutes: 0,
//                             totalSessions: 0,
//                         };
//                         allMonthsSums.push(monthSum);
//                     }
//                     monthSum.totalMinutes += session.time;
//                     monthSum.totalSessions += 1;
//                     // Sum by year
//                     let yearSum = allYearsSums.find(y => y.year === monthData.year);
//                     if (!yearSum) {
//                         yearSum = {
//                             year: monthData.year,
//                             totalMinutes: 0,
//                             totalSessions: 0,
//                         };
//                         allYearsSums.push(yearSum);
//                     }
//                     yearSum.totalMinutes += session.time;
//                     yearSum.totalSessions += 1;


//                 });
//             });
//         });
//     });

//     useDataStore.getState().setHobbySummaries(allHobbiesSums);
//     useDataStore.getState().setMonthlySummaries(allMonthsSums);
//     useDataStore.getState().setYearlySummaries(allYearsSums);
//     const monthlyActivityData = useDataStore.getState().monthDataInfo;
//     const barData = [] as { date: string, time: number, color: string }[];
//     const barDataTwo = [] as { date: string, time: number, color: string }[];
//     allMonthsSums.map((month) => {
//         const thisMonthColorScheme = monthlyActivityData.find(m => m.month === month.month)?.monthColorInfo;
//         const thisMainColor = thisMonthColorScheme ? thisMonthColorScheme.monthColor : '#8884d8';
//         barData.push({ date: month.month.toString(), time: month.totalMinutes, color: thisMainColor });
//         const avg = month.totalSessions > 0 ? parseFloat((month.totalMinutes / month.totalSessions).toFixed(2)) : 0;
//         barDataTwo.push({ date: month.month.toString(), time: avg, color: thisMainColor });
//     });
//     useDataStore.getState().setBarData(barData);
//     useDataStore.getState().setBarDataTwo(barDataTwo);
//     // Convert to percentage data
//     const allTotalMinutes = allHobbiesSums.reduce((acc, curr) => acc + curr.totalMinutes, 0);
//     const percData = [] as PercentageType[];
//     allHobbiesSums.forEach((hobby) => {
//         const percentage = allTotalMinutes > 0 ? parseFloat(((hobby.totalMinutes / allTotalMinutes) * 100).toFixed(2)) : 0;
//         percData.push({
//             name: hobby.hobbyTitle,
//             value: percentage,
//             color: hobby.hobbyColor,
//             date: new Date()
//         });
//     });

//     // Store the flat array for easy querying later
//     useDataStore.getState().setAllSessions(allSessions);

//     const thisMonth = useDataStore.getState().thisMonth;
//     let monthLength = new Date(new Date().getFullYear(), thisMonth + 1, 0).getDate();
//     const thisMonthSeshs = allMonthsSums.find(m => m.month === thisMonth)?.totalSessions;

//     const newTracker = {} as Tracker;
//     newTracker.monthLength = monthLength;
//     newTracker.numberOfDaysWith = thisMonthSeshs ? thisMonthSeshs : 0;
//     newTracker.numberOfDaysWithout = monthLength - newTracker.numberOfDaysWith;
//     useDataStore.getState().setTrackerData(newTracker);
    
//     return percData;
// }

// export async function GetDataset({ allTimeHobbyData, thisMonth }: { allTimeHobbyData: InitAllHobbyData[], thisMonth: number }) {

//     // const months = await SetMonthsFunc(thisMonth, thisYear);

//     // if (!objectToUse) {
//     //     return returnData;
//     // }

//     // const { monthNames, monthColors } = await MonthProv(months) as unknown as { monthNames: string[], monthColors: string[], message: string };

//     // if (!monthColors || !monthNames) {
//     //     return returnData;
//     // }

//     // const barMonths = monthNames.map((month) => {
//     //     return month;
//     // });
//     // const barColors = monthColors.map((color) => {
//     //     return color;
//     // });

//     // if (!barMonths || !barColors) {
//     //     return returnData;
//     // }


//     // const objectIndicies = objectToUse ? objectToUse.indexes as IUserObjectIndexed[] : [] as IUserObjectIndexed[];
//     // if (objectIndicies) {
//     //     objectIndicies.forEach((hobby: IUserObjectIndexed) => {
//     //         const hobbyFields = fields[hobby.index] as IFieldObject;
//     //         const entryIndicies = hobbyFields.entryIndexes as number[];
//     //         entryIndicies.forEach((indicy) => {
//     //             const entry = entries[indicy] as IIndexedEntry;
//     //             const entryVal = entry ? Number(entry.value) as number : -1;
//     //             const [year, month, day] = entry.date.split('-').map(Number);
//     //             const thisDate = new Date(year, month - 1, day);
//     //             if (thisDate === null) {
//     //                 return;
//     //             }
//     //             if (isThisYear(thisDate) || isSameYear(thisDate, subYears(new Date(), 1))) {
//     //                 const dateMonth = new Date(thisDate).getMonth();
//     //                 months.forEach((month: { month: number, year: number }, index: number) => {
//     //                     if (entryVal !== -1 && ((month.month + 12)) % 12 === dateMonth) {
//     //                         if (totalTimeFixedPerMonth[index] !== undefined) {
//     //                             totalTimeFixedPerMonth[index] += entryVal;
//     //                         }
//     //                         if (sessionsPerMonth[index] !== undefined) {
//     //                             sessionsPerMonth[index] += 1;
//     //                         }
//     //                     }
//     //                 });
//     //             }
//     //         });
//     //     });
//     // }

//     // const avgTotalTimeFixed = totalTimeFixedPerMonth.map((time, index) => {
//     //     let thisMonthsSeshs = sessionsPerMonth[index] as number;
//     //     if (thisMonthsSeshs === 0) {
//     //         return 0;
//     //     }
//     //     return parseFloat((time / thisMonthsSeshs).toFixed(2));
//     // });

//     // const newData = monthNames ? monthNames.map((mnth: string, index: number) => {
//     //     const total = totalTimeFixedPerMonth[index] as number;
//     //     return {
//     //         date: mnth,
//     //         time: total ? total : 0,
//     //         color: monthColors[index],
//     //     };
//     // }) as { date: string, time: number, color: string }[] : [];

//     // const newDataTwo = monthNames ? monthNames.map((mnth: string, index: number) => {
//     //     const total = avgTotalTimeFixed[index] as number;
//     //     return {
//     //         date: mnth,
//     //         time: total ? total : 0,
//     //         color: monthColors[index],
//     //     };
//     // }) as { date: string, time: number, color: string }[] : [];

//     let returnData = {} as { monthNames: string[], monthColors: string[], newData: BarData[], newDataTwo: BarData[] };
//     let totalTimeFixedPerMonth = [0, 0, 0, 0, 0] as number[];
//     let sessionsPerMonth = [0, 0, 0, 0, 0] as number[];
//     let monthColors = ['', '', '', '', ''] as string[];
//     let barMonths = ['', '', '', '', ''] as string[];
//     let newData = [] as BarData[];
//     let newDataTwo = [] as BarData[];
//     const pastFiveMonths = [thisMonth, (thisMonth - 1 + 12) % 12, (thisMonth - 2 + 12) % 12, (thisMonth - 3 + 12) % 12, (thisMonth - 4 + 12) % 12];

//     allTimeHobbyData.forEach((hobby) => {
//         hobby.counts.forEach((month) => {
//             if (pastFiveMonths.includes(month.month)) {
//                 const monthIndex = pastFiveMonths.indexOf(month.month);
//                 if (monthIndex !== -1) {
//                     month.yearCounts.forEach((year) => {
//                         totalTimeFixedPerMonth[monthIndex] += year.totalMinutes;
//                         sessionsPerMonth[monthIndex] += year.sessionCount;
//                     });
//                 }
//             }
//         });
//     });

//     // Create bar data
//     //need to update so it sifts through hobbies to find the color for each month
//     newData = allTimeHobbyData.map((monthName: string, index: number) => {
//         const total = totalTimeFixedPerMonth[index] || 0;
//         return {
//             date: monthName,
//             time: total,
//             color: monthColors[index],
//         };
//     });

//     // Calculate average session time
//     const avgTotalTimeFixed = totalTimeFixedPerMonth.map((time, index) => {
//         let thisMonthsSeshs = sessionsPerMonth[index];
//         if (thisMonthsSeshs === 0) {
//             return 0;
//         }
//         return parseFloat((time / thisMonthsSeshs).toFixed(2));
//     });

//     newDataTwo = barMonths.map((monthName: string, index: number) => {
//         const total = avgTotalTimeFixed[index] || 0;
//         return {
//             date: monthName,
//             time: total,
//             color: monthColors[index],
//         };
//     });

//     returnData = { monthNames: barMonths, monthColors: monthColors, newData, newDataTwo };

//     return returnData;
// }


// export async function FillTracker({ allTimeHobbyData, thisMonth }: { allTimeHobbyData: InitAllHobbyData[], thisMonth: number }) {

//     const daysWithHobbies = [] as string[];
//     let monthLength = new Date(new Date().getFullYear(), thisMonth + 1, 0).getDate();
//     allTimeHobbyData.forEach((hobby) => {
//         hobby.counts.forEach((month) => {
//             if (month.month === thisMonth) {
//                 month.yearCounts.filter((year) => {
//                     if (isThisYear(new Date(year.year)) || isSameYear(new Date(year.year), subYears(new Date(), 1))) {
//                         year.sessions.forEach((session) => {
//                             const sessionDate = new Date(session.date);
//                             if (sessionDate.getMonth() === thisMonth && sessionDate.getFullYear() === new Date().getFullYear()) {
//                                 const dayOfMonth = sessionDate.getDate();
//                                 if (!daysWithHobbies.includes(dayOfMonth.toString())) {
//                                     daysWithHobbies.push(dayOfMonth.toString());
//                                 }
//                             }
//                         });
//                     }
//                 });
//             }
//         });
//     });
    
//     // const objectIndicies = useHobbyStore.getState().userObjectsIndexed;

//     // const monthLength = new Date(new Date().getFullYear(), thisMonth + 1, 0).getDate();
//     // let daysWithHobbies = new Array(monthLength).fill(false);
//     // let indicies = [] as number[]
//     // for (let i = 0; i < objectIndicies.length; i++) {
//     //     let spec = objectIndicies[i] as IUserObjectIndexed
//     //     let index = -1
//     //     if (spec) {
//     //         index = spec.index;
//     //     }
//     //     if (index !== -1) {
//     //         let specificField = fields[index];
//     //         if (specificField) {
//     //             let entryIndicies = specificField.entryIndexes;
//     //             if (entryIndicies) {
//     //                 entryIndicies.forEach((indicy: number) => {
//     //                     indicies.push(indicy);
//     //                 });
//     //             }
//     //         }
//     //     }
//     // }

//     // const today = new Date();
//     // for (let i = 0; i < indicies.length; i++) {
//     //     let currIndex = indicies[i] as number;
//     //     if (currIndex !== undefined) {
//     //         const dateToUse = entries[currIndex]?.date;
//     //         if (dateToUse) {
//     //             const [year, month, day] = dateToUse.split('-').map(Number);
//     //             const date = new Date(year, month - 1, day);
//     //             if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()) {
//     //                 const dayOfMonth = date.getDate();
//     //                 daysWithHobbies[dayOfMonth - 1] = true;
//     //             }
//     //         } else {
//     //             console.log("Invalid date for index:", currIndex);
//     //         }
//     //     }
//     // }
//     const newTrackerData = [] as Tracker[];
//     daysWithHobbies.forEach((day) => {
//         if (day !== '' && !isNaN(Number(day)) && Number(day) <= monthLength && Number(day) > 0) {
//             //valid day
//             newTrackerData.push({ color: 'green', tooltip: 'Hobby completed' });
//         } else {
//             newTrackerData.push({ color: 'red', tooltip: 'No hobby completed' });
//         }
//     });


//     return { newTrackerData: newTrackerData, monthLength: monthLength };
// }

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