import { Tracker, PercentageType } from "@/components/pagecomponents/dashboard/statsView";
import { useDataStore } from "@/context/dataStore";
import { ISession } from "@/models/types/session";
import { PieChartCell } from "@mantine/charts";
import { MonthlyInfo, HobbySessionInfo } from "./initDashboardParams";

export async function InitGraphs({ sessions, monthlyInfoCounts, hobbySessionsCounts }: { sessions: ISession[], monthlyInfoCounts: MonthlyInfo[], hobbySessionsCounts: HobbySessionInfo[] }) {

    const { barData, barDataTwo, pieData } = await InitBarData(useDataStore.getState().thisMonth, sessions, monthlyInfoCounts, hobbySessionsCounts);

    if (!barData || !barDataTwo || !pieData) {
        return false;
    }

    const thisMonth = useDataStore.getState().thisMonth;
    useDataStore.getState().setBarData(barData);
    useDataStore.getState().setBarDataTwo(barDataTwo);


    const monthLength = new Date(new Date().getFullYear(), thisMonth, 0).getDate();
    const thisYear = new Date().getFullYear();
    const uniqueDaysWithSessions = sessions.filter((session) => session.month === thisMonth && session.year === thisYear).map(s => new Date(s.date).toISOString().split('T')[0]).filter((v, i, a) => a.indexOf(v) === i);
    const thisMonthSeshs = uniqueDaysWithSessions.length;
    const daysInMonthElapsed = new Date().getDate();
    const numberOfDaysWithout = Math.max(0, daysInMonthElapsed - thisMonthSeshs);


    const newTracker = {
        monthLength: monthLength,
        numberOfDaysWith: thisMonthSeshs,
        numberOfDaysWithout: numberOfDaysWithout,
        withColor: 'green',
        withoutColor: 'red',
        withTooltip: 'Hobby completed',
        withoutTooltip: 'No hobby completed',
    } as Tracker;
    const daysWith = {
        name: 'Days with a hobby session',
        value: newTracker.numberOfDaysWith,
        color: 'green'
    } as PieChartCell;
    const daysWithout = {
        name: 'Days without a hobby session',
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


export const InitBarData = async (thisMonth: number, sessions: ISession[], monthlyInfoCounts: MonthlyInfo[], hobbyDataInfo: HobbySessionInfo[]) => {

    const barData = [] as { date: string, time: number, color: string }[];
    const barDataTwo = [] as { date: string, time: number, color: string }[];
    const pieData = [] as PercentageType[];

    // Calculate past 5 months (oldest to newest for chart display)
    const pastFiveMonths = [] as { month: number, year: number }[];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = thisMonth; // Already 1-based (1-12)

    // Go back 4 months from current month (so 5 months total including current)
    for (let i = 4; i >= 0; i--) {
        let targetMonth = currentMonth - i;
        let targetYear = currentYear;

        // Handle year rollover
        if (targetMonth <= 0) {
            targetMonth += 12;
            targetYear -= 1;
        }

        pastFiveMonths.push({ month: targetMonth, year: targetYear });
    }

    //console.log('Past five months:', pastFiveMonths); // Debug log

    // Initialize arrays
    const totalMinutesRunning = [0, 0, 0, 0, 0];
    const sessionsRunning = [0, 0, 0, 0, 0];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Process each month
    pastFiveMonths.forEach((monthYear, index) => {
        // Find sessions for this specific month/year
        const monthSessions = sessions.filter(session =>
            session.month === monthYear.month && session.year === monthYear.year
        );

        // Calculate totals
        const totalMinutes = monthSessions.reduce((sum, session) => sum + session.minutes, 0);
        const sessionCount = monthSessions.length;

        totalMinutesRunning[index] = totalMinutes;
        sessionsRunning[index] = sessionCount;

        // Get month color
        const monthAct = monthlyInfoCounts.find(m => m.monthInfo.month === monthYear.month);
        const monthColor = monthAct?.monthInfo.monthColorInfo?.monthColor || '#gray';

        // Use month name for better readability
        const monthName = monthNames[monthYear.month - 1]; // Convert to 0-based for array

        barData.push({
            date: monthName,
            time: totalMinutes,
            color: monthColor
        });

        // Calculate average minutes per session
        const avgMinutes = sessionCount > 0 ? Math.round(totalMinutes / sessionCount) : 0;

        barDataTwo.push({
            date: monthName,
            time: avgMinutes,
            color: monthColor
        });

        //console.log(`${monthName} ${monthYear.year}: ${totalMinutes} mins, ${sessionCount} sessions, avg: ${avgMinutes}`); // Debug log
    });

    // Calculate pie chart data for hobby distribution over past 5 months
    let runningTotal = 0;
    hobbyDataInfo.forEach(hobby => {
        const hobbySessions = hobby.sessions.filter(session => {
            return pastFiveMonths.some(monthYear =>
                session.month === monthYear.month && session.year === monthYear.year
            );
        });
        const hobbyTotal = hobbySessions.reduce((sum, session) => sum + session.minutes, 0);
        if (hobbyTotal > 0) {
            pieData.push({
                name: hobby.hobbyData.title ? hobby.hobbyData.title : 'Unknown',
                value: hobbyTotal,
                color: hobby.hobbyData.color ? hobby.hobbyData.color : 'gray'
            });
            runningTotal += hobbyTotal;
        }
    });

    // Convert to percentages
    pieData.forEach(item => {
        item.value = runningTotal > 0 ? parseFloat(((item.value / runningTotal) * 100).toFixed(2)) : 0;
    });

    return { barData, barDataTwo, pieData };
}