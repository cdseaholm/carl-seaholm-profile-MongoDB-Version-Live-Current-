
import { getBaseUrl } from "@/utils/helpers/helpers";
import { toast } from "sonner";

export async function AttemptToCreateNewHobby({ titleToUse, colorToUse, categoryToUse, descriptionToUse, goalToUse, userID, fieldObjectIndex }: { titleToUse: string, colorToUse: string, categoryToUse: string, descriptionToUse: string[], goalToUse: string[], userID: string, fieldObjectIndex: number }, headers: HeadersInit) {

    const url = await getBaseUrl();

    if (!url) {
        return false;
    }

    if (!userID) {
        toast.error("You are not authorized to do this!")
        return false;
    }

    try {

        const res = await fetch(`${url}/api/create/hobby`, {
            method: 'POST',
            body: JSON.stringify({
                title: titleToUse,
                fieldObjectIndex: fieldObjectIndex,
                color: [colorToUse],
                categories: [categoryToUse],
                dates: [],
                descriptions: descriptionToUse,
                goals: goalToUse,
                minutesXsessions: [],
                user_email: userID
            }),
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();

        if (data.status !== 200) {
            console.log('Error creating session');
            return false;
        }

        return true;

    } catch (error) {
        return false
    }
}