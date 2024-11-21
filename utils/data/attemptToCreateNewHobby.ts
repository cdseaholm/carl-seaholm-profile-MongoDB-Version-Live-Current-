
import { toast } from "sonner";

export async function AttemptToCreateNewHobby({ titleToUse, colorToUse, categoryToUse, descriptionToUse, goalToUse, userID, fieldObjectIndex }: { titleToUse: string, colorToUse: string, categoryToUse: string, descriptionToUse: string[], goalToUse: string[], userID: string, fieldObjectIndex: number }) {

    if (!userID) {
        toast.error("You are not authorized to do this!")
        return false;
    }

    try {

        const res = await fetch(`/api/${userID}/createhobby`, {
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
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();
        console.log('data: ', data);
        if (data.status !== 200) {
            console.log('Error creating session');
            return false;
        }

        return true;

    } catch (error) {
        return false
    }
}