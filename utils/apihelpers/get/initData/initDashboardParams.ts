import { IUser } from "@/models/types/user";
import { HobbySessionInfo, IHobbyData, MonthlyInfo } from "@/models/types/hobbyData";
import { IMonthlyData } from "@/models/types/monthlyData";
import { ISession } from "@/models/types/session";
import { ITimeFrequency } from "@/models/types/time-frequency";
import { InitGraphs } from "./init-graphs";
import { filterSessions } from "./filter-info";
import { HobbyCheckMarkType } from "@/app/(content)/dashboard/components/button-board/left-board/left-board";
import { Tracker } from "@/app/(content)/dashboard/components/statsView";
import { PieChartCell } from "@mantine/charts";
import { DateRangeType } from "@/models/types/time-types/date-range";

//order of operations for checklist
//set sessions/userInfo previous
//mix sessions/hobbyData/hobby counts
//mix monthly counts and monthly data
//create year/month summaries
//set chart data (bar/pie)

//each year's sessions as it relates to each month as it relates to each hobby

export default async function InitDashboardProps({ userInfo, sessions, hobbiesData, monthlyInfo, hobbyFilters, dateFilters, thisMonth }: { userInfo: IUser, sessions: ISession[], hobbiesData: IHobbyData[], monthlyInfo: IMonthlyData[], hobbyFilters: HobbyCheckMarkType[], dateFilters: DateRangeType, thisMonth: number }): Promise<{
    status: boolean,
    message: string,
    hobbySessionInfo: HobbySessionInfo[],
    daysWithPie: PieChartCell[],
    percentagesByHobbies: PieChartCell[],
    barData: any,
    barDataTwo: any,
    tracker: Tracker,
    monthlyInfo: MonthlyInfo[],
    hobbyData: HobbySessionInfo[]
}> {

    if (!userInfo) {
        console.log('❌ No user info');
        return { status: false, message: 'No user info', hobbySessionInfo: [] as HobbySessionInfo[], daysWithPie: [] as PieChartCell[], percentagesByHobbies: [] as PieChartCell[], barData: null, barDataTwo: null, tracker: {} as Tracker, monthlyInfo: [] as MonthlyInfo[], hobbyData: [] as HobbySessionInfo[] };
    }
    if (!hobbiesData) {
        console.log('❌ No hobbies data');
        return { status: false, message: 'No hobbies data', hobbySessionInfo: [] as HobbySessionInfo[], daysWithPie: [] as PieChartCell[], percentagesByHobbies: [] as PieChartCell[], barData: null, barDataTwo: null, tracker: {} as Tracker, monthlyInfo: [] as MonthlyInfo[], hobbyData: [] as HobbySessionInfo[] };
    }
    if (!monthlyInfo) {
        console.log('❌ No monthly data');
        return { status: false, message: 'No monthly data', hobbySessionInfo: [] as HobbySessionInfo[], daysWithPie: [] as PieChartCell[], percentagesByHobbies: [] as PieChartCell[], barData: null, barDataTwo: null, tracker: {} as Tracker, monthlyInfo: [] as MonthlyInfo[], hobbyData: [] as HobbySessionInfo[] };
    }
    if (!sessions) {
        console.log('❌ No sessions data');
        return { status: false, message: 'No sessions data', hobbySessionInfo: [] as HobbySessionInfo[], daysWithPie: [] as PieChartCell[], percentagesByHobbies: [] as PieChartCell[], barData: null, barDataTwo: null, tracker: {} as Tracker, monthlyInfo: [] as MonthlyInfo[], hobbyData: [] as HobbySessionInfo[] };
    }

    // Call filterSessions with positional arguments (not destructured)
    const { filteredSessions, filteredHobbies } = await filterSessions(
        sessions,
        hobbyFilters,
        hobbiesData,
        dateFilters as DateRangeType
    );
    if (!filteredSessions) {
        console.log('❌ Error filtering sessions');
        return { status: false, message: 'Error filtering sessions', hobbySessionInfo: [] as HobbySessionInfo[], daysWithPie: [] as PieChartCell[], percentagesByHobbies: [] as PieChartCell[], barData: null, barDataTwo: null, tracker: {} as Tracker, monthlyInfo: [] as MonthlyInfo[], hobbyData: [] as HobbySessionInfo[] }
    }

    if (!filteredHobbies) {
        console.log('❌ Error filtering hobbies');
        return { status: false, message: 'Error filtering hobbies', hobbySessionInfo: [] as HobbySessionInfo[], daysWithPie: [] as PieChartCell[], percentagesByHobbies: [] as PieChartCell[], barData: null, barDataTwo: null, tracker: {} as Tracker, monthlyInfo: [] as MonthlyInfo[], hobbyData: [] as HobbySessionInfo[] }
    }

    const hobbySessionsCounts = [] as HobbySessionInfo[];

    filteredHobbies.forEach((hobby) => {
        const hobbySessions = filteredSessions.filter((session) => session.hobbyTitle === hobby.title);

        if (hobbySessions.length !== 0) {

            const totalMinutes = hobbySessions.reduce((acc, session) => acc + session.minutes, 0);
            const totalSessions = hobbySessions.length;
            const timeFrequencies = hobby.timeFrequency ? hobby.timeFrequency : [] as ITimeFrequency[];

            hobbySessionsCounts.push({
                hobbyData: hobby,
                totalMinutes,
                totalSessions,
                sessions: hobbySessions,
                timeFrequencies
            });

        } else {
            hobbySessionsCounts.push({
                hobbyData: hobby,
                totalMinutes: 0,
                totalSessions: 0,
                sessions: [] as ISession[],
                timeFrequencies: hobby.timeFrequency ? hobby.timeFrequency : [] as ITimeFrequency[]
            });
        }
    });

    const monthlyInfoCounts = [] as MonthlyInfo[];

    monthlyInfo.forEach((month) => {

        const monthSessions = filteredSessions.filter((session) =>
            session.month === month.month
        );

        if (monthSessions.length === 0) return;

        const totalMinutes = monthSessions.reduce((acc, session) => acc + session.minutes, 0);
        const totalSessions = monthSessions.length;

        monthlyInfoCounts.push({
            monthInfo: month,
            totalMinutes,
            totalSessions
        });
    });

    const initGraphs = await InitGraphs({ sessions: filteredSessions, monthlyInfoCounts: monthlyInfoCounts, hobbySessionsCounts: hobbySessionsCounts, allHobbies: filteredHobbies.length === hobbiesData.length ? true : false, dateFilters: dateFilters, thisMonth: thisMonth }) as { status: boolean, hobbySessionInfo: HobbySessionInfo[], daysWithPie: PieChartCell[], percentagesByHobbies: PieChartCell[], barData: any, barDataTwo: any, tracker: Tracker };

    if (!initGraphs) {
        console.log('❌ Error initializing graphs');
        return { status: false, message: 'Error initializing graphs', hobbySessionInfo: [] as HobbySessionInfo[], daysWithPie: [] as PieChartCell[], percentagesByHobbies: [] as PieChartCell[], barData: null, barDataTwo: null, tracker: {} as Tracker, monthlyInfo: [] as MonthlyInfo[], hobbyData: [] as HobbySessionInfo[] };
    }

    return { status: true, message: `Success`, hobbySessionInfo: initGraphs.hobbySessionInfo, daysWithPie: initGraphs.daysWithPie, percentagesByHobbies: initGraphs.percentagesByHobbies, barData: initGraphs.barData, barDataTwo: initGraphs.barDataTwo, tracker: initGraphs.tracker, monthlyInfo: monthlyInfoCounts, hobbyData: hobbySessionsCounts };

}