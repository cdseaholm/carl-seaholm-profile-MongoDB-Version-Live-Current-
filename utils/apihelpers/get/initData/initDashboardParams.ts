import { MonthSums, YearSums } from "@/app/actions/statsActions/statActions";
import { useDataStore } from "@/context/dataStore";
import { IUser } from "@/models/types/user";
import { IHobbyData } from "@/models/types/hobbyData";
import { IMonthlyData } from "@/models/types/monthlyData";
import { ISession } from "@/models/types/session";
import { ITimeFrequency } from "@/models/types/time-frequency";
import { InitGraphs } from "./init-graphs";

//order of operations for checklist
//set sessions/userInfo previous
//mix sessions/hobbyData/hobby counts
//mix monthly counts and monthly data
//create year/month summaries
//set chart data (bar/pie)


export type HobbySessionInfo = { hobbyData: IHobbyData, totalMinutes: number, totalSessions: number, sessions: ISession[], timeFrequencies: ITimeFrequency[] };
export type MonthlyInfo = { monthInfo: IMonthlyData, totalMinutes: number, totalSessions: number };
//each year's sessions as it relates to each month as it relates to each hobby

export default async function InitDashboardProps({ userInfo, hobbiesData, monthlyInfo, sessions }: { userInfo: IUser, hobbiesData: IHobbyData[], monthlyInfo: IMonthlyData[], sessions: ISession[] }) {

    if (!userInfo) {
        return { status: false, message: 'No user info' }
    }
    if (!hobbiesData) {
        return { status: false, message: 'No hobbies data' }
    }
    if (!monthlyInfo) {
        return { status: false, message: 'No monthly data' }
    }
    if (!sessions) {
        return { status: false, message: 'No sessions data' }
    }


    const hobbySessionsCounts = [] as HobbySessionInfo[];
    const monthlyInfoCounts = [] as MonthlyInfo[];

    hobbiesData.forEach((hobby) => {
        //for each hobby, find all the months that have data for it
        const hobbySessions = sessions.filter((session) => session.hobbyTitle === hobby.title);
        const totalMinutes = hobbySessions.reduce((acc, session) => acc + session.minutes, 0);
        const totalSessions = hobbySessions.length;
        const timeFrequencies = hobby.timeFrequency ? hobby.timeFrequency : [] as ITimeFrequency[];
        hobbySessionsCounts.push({ hobbyData: hobby, totalMinutes: totalMinutes, totalSessions: totalSessions, sessions: hobbySessions, timeFrequencies: timeFrequencies });
    });

    monthlyInfo.forEach((month) => {
        //for each month, find all the sessions that happened in that month
        const monthSessions = sessions.filter((session) => session.month === month.month);
        const totalMinutes = monthSessions.reduce((acc, session) => acc + session.minutes, 0);
        const totalSessions = monthSessions.length;
        const monthNum = month.month as number;
        const newMonthActivity = { monthInfo: month, totalMinutes: totalMinutes, totalSessions: totalSessions } as MonthlyInfo;
        const thisMonth = monthlyInfoCounts.find(m => m.monthInfo.month === monthNum);
        if (!thisMonth) {
            monthlyInfoCounts.push(newMonthActivity);
        } else {
            thisMonth.monthInfo = month;
            thisMonth.totalMinutes = totalMinutes;
            thisMonth.totalSessions = totalSessions;
        }
    });

    // const totalTimePerMonth = timeData.totalTimePerPastFiveMonths ? timeData.totalTimePerPastFiveMonths : [] as number[];
    // const userObjects = timeData.userObjects ? timeData.userObjects : [] as IUserObject[];
    // const sessionsFound = timeData.sessionsFound ? timeData.sessionsFound : [] as IIndexedEntry[];
    // const colorMap = timeData.colorMap ? timeData.colorMap : [] as ColorMapType[];
    // const fieldObjects = timeData.fieldObjects ? timeData.fieldObjects : [] as IFieldObject[];
    // const objectToUse = timeData.firstObject ? timeData.firstObject : {} as IUserObject;

    // const newDashProps = { userInfo: userInfo, totalTimePerMonth: totalTimePerMonth, userObjects: userObjects, sessionsFound: sessionsFound, colorMap: colorMap, fieldObjects: fieldObjects, objectToUse: objectToUse } as DashProps;

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

    const initGraphs = await InitGraphs({ sessions: sessions, monthlyInfoCounts: monthlyInfoCounts, hobbySessionsCounts: hobbySessionsCounts });
    if (!initGraphs) {
        return { status: false, message: 'Error initializing graphs' }
    }
    
    return { status: true, message: `Success` }

}