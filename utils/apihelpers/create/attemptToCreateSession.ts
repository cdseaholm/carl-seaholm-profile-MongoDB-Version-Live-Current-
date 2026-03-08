'use server'

import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/mongodb";
import HobbyData from "@/models/hobbyData";
import Session from "@/models/session";
import { ISession } from "@/models/types/session";
import { ITimeFrequency } from "@/models/types/time-frequency";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function AttemptCreateSession({ newSession }: { newSession: ISession }) {

    const session = await getServerSession(authOptions);

    if (!newSession) {
        console.error('No session data provided');
        return { worked: false, message: 'No session data provided' };
    }

    if (!session || !session.user || !session.user.email) {
        console.error('Unauthorized: No session or user email found');
        return { worked: false, message: 'Unauthorized' };
    }

    const userEmail = session.user.email;

    try {
        await connectDB();

        const user = await User.findOne({ email: userEmail });
        if (!user) {
            console.error('User not found for email:', userEmail);
            return { worked: false, message: 'User not found' };
        }

        const hobby = await HobbyData.findOne({ userId: user._id.toString(), title: newSession.hobbyTitle });

        if (!hobby) {
            return { worked: false, message: 'Hobby not found' };
        }

        const timeFreq = hobby.timeFrequency as ITimeFrequency[];
        if (timeFreq === undefined || timeFreq === null) {
            hobby.timeFrequency = [] as ITimeFrequency[];
        }

        const existingFreqIndex = hobby.timeFrequency.findIndex((freq) => freq.time === newSession.minutes);
        
        if (existingFreqIndex === -1) {
            hobby.timeFrequency.push({ time: newSession.minutes, frequency: 1 });
        } else {
            hobby.timeFrequency[existingFreqIndex].frequency += 1;
        }
        await hobby.save();

        const createdSession = await Session.create({
            userId: user._id.toString(),
            hobbyTitle: newSession.hobbyTitle,
            minutes: newSession.minutes,
            date: newSession.date,
            month: newSession.month,
            year: newSession.year,
            createdAt: new Date(),
            updatedAt: new Date()
        }) as ISession;

        if (!createdSession) {
            console.error('Failed to create session, reverting time frequency update');
            hobby.timeFrequency = timeFreq;
            await hobby.save();
            return { worked: false, message: 'Failed to create session' };
        }

        revalidatePath('/dashboard');

        return { worked: true, message: 'Session created successfully' };

    } catch (error) {
        console.error('Error creating session:', error);
        return { worked: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
}

//OLD API FETCH ROUTE
// import { useDataStore } from "@/context/dataStore";
// import { ISession } from "@/models/types/session";
// import { getBaseUrl } from "@/utils/helpers/helpers";

// export async function AttemptCreateSession({ newSession }: { newSession: ISession }, headers: HeadersInit) {

//     const url = await getBaseUrl();

//     if (!url) {
//         return false;
//     }

//     try {

//         const res = await fetch(`${url}/api/create/session`, {
//             method: 'POST',
//             headers: {
//                 ...headers,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 newSession: newSession
//             }),

//         });

//         if (!res) {
//             return { worked: false }
//         }

//         const data = await res.json();

//         if (!data) {
//             return { worked: false }
//         }

//         if (data.status !== 200) {
//             console.log('Error creating session', data.message);
//             return { worked: false };
//         }

//         useDataStore.getState().setSessions([...useDataStore.getState().sessions, newSession]);
//         useDataStore.getState().setHobbySessionInfo(useDataStore.getState().hobbySessionInfo.map(h => {
//             if (h.hobbyData.title === newSession.hobbyTitle) {
//                 return {
//                     ...h,
//                     totalMinutes: h.totalMinutes + newSession.minutes,
//                     totalSessions: h.totalSessions + 1
//                 }
//             }
//             return h;
//         }));
//         useDataStore.getState().setMonthlySummaries(useDataStore.getState().monthlySummaries.map(m => {
//             if (m.month === newSession.month && m.year === newSession.year) {
//                 return {
//                     ...m,
//                     totalMinutes: m.totalMinutes + newSession.minutes,
//                     totalSessions: m.totalSessions + 1
//                 }
//             }
//             return m;
//         }));
//         useDataStore.getState().setYearlySummaries(useDataStore.getState().yearlySummaries.map(y => {
//             if (y.year === newSession.year) {
//                 return {
//                     ...y,
//                     totalMinutes: y.totalMinutes + newSession.minutes,
//                     totalSessions: y.totalSessions + 1
//                 }
//             }   
//             return y;
//         }));
        

//         return { worked: true };

//     } catch (error) {
//         console.error('Error updating session', error);
//         return { worked: false };
//     }
// }