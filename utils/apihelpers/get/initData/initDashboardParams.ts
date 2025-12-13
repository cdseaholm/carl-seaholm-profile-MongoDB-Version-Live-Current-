import { MonthSums, YearSums } from "@/app/actions/statsActions/statActions";
import { DateRangeType, useDataStore } from "@/context/dataStore";
import { IUser } from "@/models/types/user";
import { IHobbyData } from "@/models/types/hobbyData";
import { IMonthlyData } from "@/models/types/monthlyData";
import { ISession } from "@/models/types/session";
import { ITimeFrequency } from "@/models/types/time-frequency";
import { InitGraphs } from "./init-graphs";
import { filterSessions } from "./filter-info";
import { HobbyCheckMarkType } from "@/app/(content)/dashboard/components/button-board/left-board/left-board";

//order of operations for checklist
//set sessions/userInfo previous
//mix sessions/hobbyData/hobby counts
//mix monthly counts and monthly data
//create year/month summaries
//set chart data (bar/pie)


export type HobbySessionInfo = { hobbyData: IHobbyData, totalMinutes: number, totalSessions: number, sessions: ISession[], timeFrequencies: ITimeFrequency[] };
export type MonthlyInfo = { monthInfo: IMonthlyData, totalMinutes: number, totalSessions: number };
//each year's sessions as it relates to each month as it relates to each hobby

export default async function InitDashboardProps({ userInfo, sessions, hobbiesData, monthlyInfo, hobbyFilters, dateFilters }: { userInfo: IUser, sessions: ISession[], hobbiesData: IHobbyData[], monthlyInfo: IMonthlyData[], hobbyFilters: HobbyCheckMarkType[], dateFilters: DateRangeType }) {

    // Validation checks...
    if (!userInfo) return { status: false, message: 'No user info' };
    if (!hobbiesData) return { status: false, message: 'No hobbies data' };
    if (!monthlyInfo) return { status: false, message: 'No monthly data' };
    if (!sessions) return { status: false, message: 'No sessions data' };

    // Call filterSessions with positional arguments (not destructured)
    const { filteredSessions, filteredHobbies } = await filterSessions(
        sessions,
        hobbyFilters,
        hobbiesData,
        dateFilters as DateRangeType
    );

    if (!filteredSessions) {
        return { status: false, message: 'Error filtering sessions' }
    }

    if (!filteredHobbies) {
        return { status: false, message: 'Error filtering hobbies' }
    }

    // Now aggregate data based on filtered sessions
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

    // Aggregate monthly data from filtered sessions
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

    const allMonthsSums = [] as MonthSums[];
    const allYearsSums = [] as YearSums[];

    hobbySessionsCounts.forEach((hobby) => {
        hobby.sessions.forEach((session) => {
            const thisYear = session.year;
            const thisMonth = session.month;
            const thisYearSum = allYearsSums.find(y => y.year === thisYear);
            if (!thisYearSum) {
                const newYearSum = { year: thisYear, totalMinutes: session.minutes, totalSessions: 1 };
                allYearsSums.push(newYearSum);
            } else {
                thisYearSum.totalMinutes += session.minutes;
                thisYearSum.totalSessions += 1;
            }
            const thisMonthSum = allMonthsSums.find(m => m.month === thisMonth && m.year === thisYear);
            if (!thisMonthSum) {
                const newMonthSum = { month: thisMonth, totalMinutes: session.minutes, totalSessions: 1, year: thisYear };
                allMonthsSums.push(newMonthSum);
            } else {
                thisMonthSum.totalMinutes += session.minutes;
                thisMonthSum.totalSessions += 1;
            }
        });
    });

    useDataStore.getState().setMonthlySummaries(allMonthsSums);
    useDataStore.getState().setYearlySummaries(allYearsSums);
    useDataStore.getState().setMonthlyInfo(monthlyInfoCounts);
    useDataStore.getState().setHobbySessionInfo(hobbySessionsCounts);

    const initGraphs = await InitGraphs({ sessions: filteredSessions, monthlyInfoCounts: monthlyInfoCounts, hobbySessionsCounts: hobbySessionsCounts, allHobbies: filteredHobbies.length === hobbiesData.length ? true : false, dateFilters: dateFilters });
    if (!initGraphs) {
        return { status: false, message: 'Error initializing graphs' }
    }

    return { status: true, message: `Success` }

}