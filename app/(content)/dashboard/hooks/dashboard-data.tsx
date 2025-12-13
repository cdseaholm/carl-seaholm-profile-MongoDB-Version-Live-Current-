'use client'

import { useDataStore } from "@/context/dataStore";
import { ISession } from "@/models/types/session";
import { HobbySessionInfo } from "@/utils/apihelpers/get/initData/initDashboardParams";
import { useMemo } from "react";


export function useDashboardData(daySelected: string) {
    
    const sessions = useDataStore(state => state.sessions);
    const hobbySessionsInfo = useDataStore(state => state.hobbySessionInfo) as HobbySessionInfo[];
    const hobbiesData = useDataStore(state => state.hobbyData);
    const filteredHobbies = useDataStore(state => state.filteredHobbies);

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