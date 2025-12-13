import { Tracker, PercentageType } from "@/app/(content)/dashboard/components/statsView";
import { DateRangeType, useDataStore } from "@/context/dataStore";
import { ISession } from "@/models/types/session";
import { PieChartCell } from "@mantine/charts";
import { MonthlyInfo, HobbySessionInfo } from "./initDashboardParams";
import { MonthProv } from "@/components/helpers/monthprov";
import { GetMonthLength } from "@/utils/data/month-lengths";

function getDayCount(start: Date, end: Date): number {
    // Normalize to start of day
    const startDate = new Date(start);
    const endDate = new Date(end);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    
    const diffInMs = endDate.getTime() - startDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    return diffInDays + 1; // +1 because we include both start and end dates
}

export async function InitGraphs({ sessions, monthlyInfoCounts, hobbySessionsCounts, allHobbies, dateFilters }: { sessions: ISession[], monthlyInfoCounts: MonthlyInfo[], hobbySessionsCounts: HobbySessionInfo[], allHobbies: boolean, dateFilters: DateRangeType }) {

    const thisMonth = useDataStore.getState().thisMonth;
    let datesToUse: DateRangeType;

    if (!dateFilters || dateFilters === undefined || dateFilters === null || !dateFilters.range || (dateFilters.range[0] === null && dateFilters.range[1] === null)) {
        const pastFiveMonths = thisMonth - 5 <= 0 ? 12 + (thisMonth - 5) : thisMonth - 5;
        const startDate = new Date();
        startDate.setMonth(pastFiveMonths);
        datesToUse = { type: 'range', range: [startDate, new Date()] };
    } else {
        datesToUse = dateFilters;
    }

    const { barData, barDataTwo, pieData } = await InitBarData(useDataStore.getState().thisMonth, sessions, monthlyInfoCounts, hobbySessionsCounts, allHobbies, datesToUse);

    if (!barData || !barDataTwo || !pieData) {
        return false;
    }

    useDataStore.getState().setBarData(barData);
    useDataStore.getState().setBarDataTwo(barDataTwo);



    const daysWithLabel = 'Days with';
    const daysWithoutLabel = 'Days without';

    let length = 0;
    let daysWithoutCount = 0;

    const thisRangesSessions = sessions.filter((session) => {
        const sessionDate = new Date(session.date);
        if (datesToUse && datesToUse.range[0] && datesToUse.range[1]) {
            return sessionDate >= datesToUse.range[0] && sessionDate <= datesToUse.range[1];
        } else if (datesToUse && datesToUse.range[0]) {
            return sessionDate >= datesToUse.range[0];
        } else if (datesToUse && datesToUse.range[1]) {
            return sessionDate <= datesToUse.range[1];
        }
        return true;
    });

    //HAVE TO MAKE SURE THAT WHEN USERS PICK ONE DATE IT SETS THE FIRST IN THE ARRAY
    if (datesToUse && datesToUse.range[0] && datesToUse.range[1]) {
        const start = new Date(datesToUse.range[0]);
        const end = new Date(datesToUse.range[1]);

        // ✅ Fix: Remove Math.ceil (not needed) and adjust calculation
        // Set both dates to start of day to avoid time-of-day issues
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        const dayCount = getDayCount(datesToUse.range[0], datesToUse.range[1]);

        const uniqueDaysWithSessions = new Set(thisRangesSessions.map(session => {
            const sessionDate = new Date(session.date);
            return sessionDate.toDateString();
        }));

        daysWithoutCount = dayCount - uniqueDaysWithSessions.size;
        length = dayCount;
    }



    const newTracker = {
        length: length,
        numberOfDaysWith: length - daysWithoutCount,
        numberOfDaysWithout: daysWithoutCount,
        withColor: 'green',
        withoutColor: 'red',
        withTooltip: 'Hobby completed',
        withoutTooltip: 'No hobby completed',
    } as Tracker;

    const daysWith = {
        name: daysWithLabel,
        value: newTracker.numberOfDaysWith,
        color: 'green'
    } as PieChartCell;

    const daysWithout = {
        name: daysWithoutLabel,
        value: newTracker.numberOfDaysWithout,
        color: 'red'
    } as PieChartCell;

    const daysWithPie = [] as PieChartCell[];
    daysWithPie.push(daysWith);
    daysWithPie.push(daysWithout);

    const pieChartTwo = pieData.map((d) => {
        return {
            value: d.value,
            name: d.name,
            color: d.color
        } as PieChartCell
    }) as PieChartCell[];



    useDataStore.getState().setDaysWithPieChart(daysWithPie);
    useDataStore.getState().setHobbySessionInfo(hobbySessionsCounts);
    useDataStore.getState().setPercentagesByHobbies(pieChartTwo);

    return true;

}


export async function InitBarData(thisMonth: number, sessions: ISession[], monthlyInfoCounts: MonthlyInfo[], hobbyDataInfo: HobbySessionInfo[], allHobbies: boolean, datesToUse: DateRangeType) {

    const barData = [] as { date: string, time: number, color: string }[];
    const barDataTwo = [] as { date: string, time: number, color: string }[];
    const pieData = [] as PercentageType[];

    const d = [] as { month: number, year: number }[];
    const dStartStops = [] as { start: number, stop: number }[];

    if (datesToUse && datesToUse.range && datesToUse.range[0] && datesToUse.range[1]) {
        const start = new Date(datesToUse.range[0]);
        const end = new Date(datesToUse.range[1]);
        const tempDate = new Date(start);

        while (tempDate <= end) {
            d.push({ month: tempDate.getMonth() + 1, year: tempDate.getFullYear() });
            let thisMonthStart = 1;
            let thisMonthEnd = 0;
            const thisMonthLength = await GetMonthLength(tempDate.getMonth() + 1, tempDate.getFullYear());

            if (tempDate.getMonth() === start.getMonth() && tempDate.getFullYear() === start.getFullYear()) {
                thisMonthStart = start.getDate();
            }
            if (tempDate.getMonth() === end.getMonth() && tempDate.getFullYear() === end.getFullYear()) {
                thisMonthEnd = end.getDate();
            } else {
                thisMonthEnd = thisMonthLength;
            }

            dStartStops.push({ start: thisMonthStart, stop: thisMonthEnd });
            tempDate.setMonth(tempDate.getMonth() + 1);
        }
    } else if (datesToUse && datesToUse.range[0] && !datesToUse.range[1]) {
        const singleDay = new Date(datesToUse.range[0]);
        d.push({ month: singleDay.getMonth() + 1, year: singleDay.getFullYear() });
        dStartStops.push({ start: singleDay.getDate(), stop: singleDay.getDate() });
    } else {
        // Default to past 5 months
        for (let i = 5; i > 0; i--) {
            let monthToAdd = thisMonth - i;
            let yearToAdd = new Date().getFullYear();
            if (monthToAdd <= 0) {
                monthToAdd = 12 + monthToAdd;
                yearToAdd -= 1;
            }
            d.push({ month: monthToAdd, year: yearToAdd });
            const thisMonthLength = await GetMonthLength(monthToAdd, yearToAdd);
            dStartStops.push({ start: 1, stop: thisMonthLength });
        }
    }

    const newMap = d.map(item => ({ month: item.month - 1, year: item.year }));
    const monthNames = await MonthProv(newMap);

    d.forEach((monthYear, index) => {
        // ✅ Filter sessions by month/year AND day range
        const startDay = dStartStops[index].start;
        const endDay = dStartStops[index].stop;

        const monthSessions = sessions.filter(session => {
            if (session.month !== monthYear.month || session.year !== monthYear.year) {
                return false;
            }
            // Also check day range
            const sessionDay = new Date(session.date).getDate() || 1;
            return sessionDay >= startDay && sessionDay <= endDay;
        });

        // ✅ Calculate totals from FILTERED sessions only
        const totalMinutes = monthSessions.reduce((sum, session) => sum + session.minutes, 0);
        const sessionCount = monthSessions.length;

        // Get month color from monthlyInfoCounts
        const monthInfo = monthlyInfoCounts.find(m =>
            m.monthInfo.month === monthYear.month
        );

        const initialDate = monthNames && monthNames.monthNamesOnly.length > 0 ? monthNames.monthNamesOnly[index] : '';
        const sameDay = datesToUse.range[1] === null ||
            datesToUse.range[1] === undefined ||
            (datesToUse.range[0] && datesToUse.range[1] &&
                datesToUse.range[0].toDateString() === datesToUse.range[1].toDateString());
        const secondaryDate = dStartStops.length > 0 && !sameDay ? ` ${dStartStops[index].start}-${dStartStops[index].stop}` : '';
        const monthLabel = `${initialDate}${secondaryDate}`;

        const timeRoundedToTwo = Math.round((totalMinutes / 60) * 100) / 100;
        barData.push({
            date: monthLabel,
            time: timeRoundedToTwo,
            color: monthInfo?.monthInfo.monthColorInfo.monthColor || '#888888'
        });

        const avgMinutes = sessionCount > 0 ? totalMinutes / sessionCount : 0;
        barDataTwo.push({
            date: monthLabel,
            time: Math.round(avgMinutes * 100) / 100,
            color: monthInfo?.monthInfo.monthColorInfo.monthColor || '#888888'
        });
    });

    // Calculate pie chart data
    let runningTotal = 0;

    hobbyDataInfo.forEach(hobby => {
        if (hobby.totalMinutes > 0) {
            pieData.push({
                name: hobby.hobbyData.title || 'Unknown',
                value: hobby.totalMinutes,
                color: hobby.hobbyData.color || 'gray'
            });
            runningTotal += hobby.totalMinutes;
        }
    });

    // Convert to percentages or hours
    if (allHobbies) {
        pieData.forEach(item => {
            const perc = runningTotal > 0 ? (item.value / runningTotal) * 100 : 0;
            item.value = Math.round(perc * 10) / 10;
        });
    } else {
        pieData.forEach(item => {
            item.value = Math.round((item.value / 60) * 100) / 100;
        });
    }

    return { barData, barDataTwo, pieData };
}