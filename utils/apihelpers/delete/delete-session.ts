
import { EditSessionType } from "@/models/types/edit-session";
import { getBaseUrl } from "@/utils/helpers/helpers";
import { toast } from "sonner";

export async function AttemptDeleteSession({ deleteSession, userEmail }: { deleteSession: EditSessionType, userEmail: string }, headers: HeadersInit) {

    const urlToUse = await getBaseUrl();

    if (!urlToUse) {
        toast.error("Could not determine base URL!");
        return {message: 'No base URL', worked: false };
    }

    if (!userEmail) {
        toast.error("You are not authorized to do this!~no email")
        return {message: 'No user email', worked: false };
    }

    if (!deleteSession) {
        toast.error("No hobby data provided!");
        return {message: 'No session to delete', worked: false };
    }

    try {

        const response = await fetch(`${urlToUse}/api/delete/session`, {
            method: 'DELETE',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionToDelete: deleteSession, user_email: userEmail })
        });

        const data = await response.json();

        if (data.status !== 200) {
            return { message: 'Error deleting session', worked: false };
        }
        return { message: 'Session deleted', worked: true };
    } catch (error) {
        console.error('Error deleting session, error: ', error);
        return { message: 'Error deleting session', worked: false };
    }
}