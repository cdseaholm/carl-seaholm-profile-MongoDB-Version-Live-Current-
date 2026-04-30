'use server'

import { EditSessionType } from "@/models/types/edit-session";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import Session from "@/models/session";
import HobbyData from "@/models/hobbyData";
import { IHobbyData } from "@/models/types/hobbyData";
import { ITimeFrequency } from "@/models/types/time-frequency";

//not really used atm but need to test soon

export async function AttemptDeleteSession({ deleteSession }: { deleteSession: EditSessionType }) {

    if (!deleteSession) {
        console.error('No session data provided');
        return { worked: false, message: 'No session data provided' };
    }

    const hobbyTitle = deleteSession.hobbyTitle;
    const seshInfo = deleteSession.sessionInfo;
    const oldSeshValue = seshInfo.minutes;

    try {
        await connectDB();

        const hobbyFound = await HobbyData.findOne({ title: hobbyTitle }) as IHobbyData;

        if (!hobbyFound) {
            return { worked: false, message: 'Hobby not found' };
        }

        const hobbyId = hobbyFound._id?.toString();

        if (!hobbyId) {
            return { worked: false, message: 'Hobby ID not found' };
        }

        const hobbyTimeFreq = hobbyFound.timeFrequency ? [...hobbyFound.timeFrequency] : [] as ITimeFrequency[];

        const oldSeshValueFreq = hobbyTimeFreq.find((timeFreq) => timeFreq.time === oldSeshValue);

        if (oldSeshValueFreq) {
            oldSeshValueFreq.frequency = Math.max(0, oldSeshValueFreq.frequency - 1);

            if (oldSeshValueFreq.frequency === 0) {
                const index = hobbyTimeFreq.indexOf(oldSeshValueFreq);
                if (index > -1) {
                    hobbyTimeFreq.splice(index, 1);
                }
            }
        }

        await HobbyData.updateOne(
            { _id: hobbyId },
            {
                timeFrequency: hobbyTimeFreq,
                updatedAt: new Date()
            }
        );

        const deleteResult = await Session.deleteOne({ _id: seshInfo._id.toString() });

        if (deleteResult.deletedCount === 0) {
            await HobbyData.updateOne(
                { _id: hobbyId },
                {
                    timeFrequency: hobbyFound.timeFrequency ? [...hobbyFound.timeFrequency] : [] as ITimeFrequency[],
                    updatedAt: new Date()
                }
            );
            return { worked: false, message: 'Session not found or already deleted' };
        }

        revalidatePath('/dashboard');

        return { worked: true, message: 'Session deleted successfully' };

    } catch (error) {
        console.error('Error deleting session:', error);
        return { worked: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
}


// import { EditSessionType } from "@/models/types/edit-session";
// import { getBaseUrl } from "@/utils/helpers/helpers";
// import { toast } from "sonner";

// export async function AttemptDeleteSession({ deleteSession, userEmail }: { deleteSession: EditSessionType, userEmail: string }, headers: HeadersInit) {

//     const urlToUse = await getBaseUrl();

//     if (!urlToUse) {
//         toast.error("Could not determine base URL!");
//         return {message: 'No base URL', worked: false };
//     }

//     if (!userEmail) {
//         toast.error("You are not authorized to do this!~no email")
//         return {message: 'No user email', worked: false };
//     }

//     if (!deleteSession) {
//         toast.error("No hobby data provided!");
//         return {message: 'No session to delete', worked: false };
//     }

//     try {

//         const response = await fetch(`${urlToUse}/api/delete/session`, {
//             method: 'DELETE',
//             headers: {
//                 ...headers,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ sessionToDelete: deleteSession, user_email: userEmail })
//         });

//         const data = await response.json();

//         if (data.status !== 200) {
//             return { message: 'Error deleting session', worked: false };
//         }
//         return { message: 'Session deleted', worked: true };
//     } catch (error) {
//         console.error('Error deleting session, error: ', error);
//         return { message: 'Error deleting session', worked: false };
//     }
// }