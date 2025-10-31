
import { useDataStore } from "@/context/dataStore";
import { ISession } from "@/models/types/session";
import { getBaseUrl } from "@/utils/helpers/helpers";

export async function AttemptCreateSession({ newSession }: { newSession: ISession }, headers: HeadersInit) {

    const url = await getBaseUrl();

    if (!url) {
        return false;
    }

    try {

        const res = await fetch(`${url}/api/create/session`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newSession: newSession
            }),

        });

        if (!res) {
            return { worked: false }
        }

        const data = await res.json();

        if (!data) {
            return { worked: false }
        }

        if (data.status !== 200) {
            console.log('Error creating session', data.message);
            return { worked: false };
        }

        useDataStore.getState().setSessions([...useDataStore.getState().sessions, newSession]);
        useDataStore.getState().setHobbySessionInfo(useDataStore.getState().hobbySessionInfo.map(h => {
            if (h.hobbyData.title === newSession.hobbyTitle) {
                return {
                    ...h,
                    totalMinutes: h.totalMinutes + newSession.minutes,
                    totalSessions: h.totalSessions + 1
                }
            }
            return h;
        }));
        useDataStore.getState().setMonthlySummaries(useDataStore.getState().monthlySummaries.map(m => {
            if (m.month === newSession.month && m.year === newSession.year) {
                return {
                    ...m,
                    totalMinutes: m.totalMinutes + newSession.minutes,
                    totalSessions: m.totalSessions + 1
                }
            }
            return m;
        }));
        useDataStore.getState().setYearlySummaries(useDataStore.getState().yearlySummaries.map(y => {
            if (y.year === newSession.year) {
                return {
                    ...y,
                    totalMinutes: y.totalMinutes + newSession.minutes,
                    totalSessions: y.totalSessions + 1
                }
            }   
            return y;
        }));
        

        return { worked: true };

    } catch (error) {
        console.error('Error updating session', error);
        return { worked: false };
    }
}