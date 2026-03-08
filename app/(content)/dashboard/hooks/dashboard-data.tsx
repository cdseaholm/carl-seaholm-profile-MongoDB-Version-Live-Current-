'use client'

import { HobbySessionInfo, IHobbyData } from "@/models/types/hobbyData";
import { ISession } from "@/models/types/session";
import { useMemo } from "react";
import { HobbyCheckMarkType } from "../components/button-board/left-board/left-board";


export function useDashboardData({ daySelected, sessions, hobbySessionsInfo, hobbiesData, filteredHobbies }: { daySelected: string, sessions: ISession[], hobbySessionsInfo: HobbySessionInfo[], hobbiesData: IHobbyData[], filteredHobbies: HobbyCheckMarkType[] }) {


    const allHobbies = useMemo(
        () => filteredHobbies.length === hobbiesData.length,
        [filteredHobbies.length, hobbiesData.length]
    );

    const entriesOTD = useMemo(() => {
        const entries: HobbySessionInfo[] = [];
        hobbySessionsInfo.forEach((hobbySessions) => {
            const sessionsForDay = sessions.filter((session: ISession) => {
                const sessionDate = new Date(session.date).toLocaleDateString();
                return sessionDate === daySelected;
            });
            const sessionsForHobbyForDay = sessionsForDay.filter(
                (session: ISession) => session.hobbyTitle === hobbySessions.hobbyData.title
            );
            if (sessionsForDay.length > 0) {
                entries.push({
                    ...hobbySessions,
                    sessions: sessionsForHobbyForDay,
                });
            }
        });
        return entries;
    }, [hobbySessionsInfo, sessions, daySelected]);

    return { entriesOTD, allHobbies };
}