
import { EditSessionType } from "@/models/types/edit-session";
import { getBaseUrl } from "@/utils/helpers/helpers";
import { toast } from "sonner";

export async function AttemptEditSession({ editSession, userEmail }: { editSession: EditSessionType, userEmail: string }, headers: HeadersInit) {

    const urlToUse = await getBaseUrl();

    if (!urlToUse) {
        toast.error("Could not determine base URL!");
        return { message: 'No base URL', worked: false };
    }

    if (!userEmail) {
        toast.error("You are not authorized to do this!~no email")
        return { message: 'No user email', worked: false };
    }

    if (!editSession) {
        toast.error("No hobby data provided!");
        return { message: 'No session to edit', worked: false };
    }

    try {

        const response = await fetch(`${urlToUse}/api/edit/session`, {
            method: 'PUT',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionToEdit: editSession, user_email: userEmail })
        });

        const data = await response.json();

        if (data.status !== 200) {
            return { message: 'Error editing session', worked: false };
        }

        return { message: 'Session edited', worked: true };
    } catch (error) {
        console.error('Error editing session, error: ', error);
        return { message: 'Error editing session', worked: false };
    }
}