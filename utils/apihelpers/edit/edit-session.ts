'use server'

import { EditSessionType } from "@/models/types/edit-session";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import Session from "@/models/session";
import HobbyData from "@/models/hobbyData";
import { IHobbyData } from "@/models/types/hobbyData";
import { ITimeFrequency } from "@/models/types/time-frequency";

export async function AttemptEditSession({ editSession }: { editSession: EditSessionType }) {

    if (!editSession) {
        console.error('No session data provided');
        return { worked: false, message: 'No session data provided' };
    }

    try {
        await connectDB();

        const newSeshValue = Number(editSession.sessionTime);
        const hobbyTitle = editSession.hobbyTitle;
        const oldSeshValue = editSession.sessionInfo.minutes;

        if (!hobbyTitle) {
            console.error('Session must have a title');
            return { worked: false, message: 'Session must have a title' };
        }

        if (!editSession.sessionInfo || !editSession.sessionInfo._id) {
            console.error('No session info provided');
            return { worked: false, message: 'No session info provided' };
        }

        const hobbyFound = await HobbyData.findOne({ title: hobbyTitle }) as IHobbyData;

        if (!hobbyFound || !hobbyFound._id) {
            console.error('Hobby not found for title:', hobbyTitle);
            return { worked: false, message: 'Hobby not found' };
        }

        const hobbyTimeFreq = hobbyFound.timeFrequency ? [...hobbyFound.timeFrequency] : [] as ITimeFrequency[];

        const oldFreq = hobbyTimeFreq.find((tf) => tf.time === oldSeshValue);
        if (oldFreq) {
            oldFreq.frequency = Math.max(0, oldFreq.frequency - 1);
            if (oldFreq.frequency === 0) {
                const index = hobbyTimeFreq.indexOf(oldFreq);
                if (index > -1) hobbyTimeFreq.splice(index, 1);
            }
        }

        if (newSeshValue === 0) {

            await HobbyData.updateOne(
                { _id: hobbyFound._id?.toString() },
                { timeFrequency: hobbyTimeFreq, updatedAt: new Date() },
            );

            const deleteResult = await Session.deleteOne({ _id: editSession.sessionInfo._id.toString() });

            if (deleteResult.deletedCount === 0) {
                console.error('Failed to delete session, reverting time frequency update');
                await HobbyData.updateOne(
                    { _id: hobbyFound._id?.toString() },
                    { timeFrequency: hobbyFound.timeFrequency, updatedAt: new Date() }
                );
                return { worked: false, message: 'Failed to delete session' };
            }

            revalidatePath('/dashboard');
            return { worked: true, message: 'Session updated with 0 minutes (deleted)' };

        }

        if (newSeshValue <= 0 || isNaN(newSeshValue)) {
            console.error('Invalid session time provided:', newSeshValue);
            return { worked: false, message: 'Invalid session time provided' };
        }

        if (newSeshValue === oldSeshValue) {
            console.log('No changes to update');
            return { worked: true, message: 'No changes to update' };
        }

        const newFreq = hobbyTimeFreq.find((tf) => tf.time === newSeshValue);
        if (newFreq) {
            newFreq.frequency += 1;
        } else {
            hobbyTimeFreq.push({ time: newSeshValue, frequency: 1 });
        }

        await HobbyData.updateOne(
            { _id: hobbyFound._id.toString() },
            { timeFrequency: hobbyTimeFreq, updatedAt: new Date() }
        );

        const updateResult = await Session.updateOne(
            { _id: editSession.sessionInfo._id.toString() },
            { minutes: newSeshValue, updatedAt: new Date() }
        );

        if (updateResult.modifiedCount === 0) {
            console.error('Failed to update session, reverting time frequency update');
            await HobbyData.updateOne(
                { _id: hobbyFound._id.toString() },
                { timeFrequency: hobbyFound.timeFrequency, updatedAt: new Date() }
            );
            return { worked: false, message: 'Failed to update session' };
        }

        revalidatePath('/dashboard');
        console.log('✅ Session edited and path revalidated');
        return { worked: true, message: 'Session edited successfully' };

    } catch (error) {
        console.error('Error editing session:', error);
        return { worked: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
}


// import { EditSessionType } from "@/models/types/edit-session";
// import { getBaseUrl } from "@/utils/helpers/helpers";
// import { toast } from "sonner";

// export async function AttemptEditSession({ editSession, userEmail }: { editSession: EditSessionType, userEmail: string }, headers: HeadersInit) {

//     const urlToUse = await getBaseUrl();

//     if (!urlToUse) {
//         toast.error("Could not determine base URL!");
//         return { message: 'No base URL', worked: false };
//     }

//     if (!userEmail) {
//         toast.error("You are not authorized to do this!~no email")
//         return { message: 'No user email', worked: false };
//     }

//     if (!editSession) {
//         toast.error("No hobby data provided!");
//         return { message: 'No session to edit', worked: false };
//     }

//     try {

//         const response = await fetch(`${urlToUse}/api/edit/session`, {
//             method: 'PUT',
//             headers: {
//                 ...headers,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ sessionToEdit: editSession, user_email: userEmail })
//         });

//         const data = await response.json();

//         if (data.status !== 200) {
//             return { message: 'Error editing session', worked: false };
//         }

//         return { message: 'Session edited', worked: true };
//     } catch (error) {
//         console.error('Error editing session, error: ', error);
//         return { message: 'Error editing session', worked: false };
//     }
// }