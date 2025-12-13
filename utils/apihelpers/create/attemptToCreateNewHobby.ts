
import { useDataStore } from "@/context/dataStore";
import { IHobbyData } from "@/models/types/hobbyData";
import { getBaseUrl } from "@/utils/helpers/helpers";
import { toast } from "sonner";

export async function AttemptToCreateNewHobby({ hobbyToCreate, userEmail }: { hobbyToCreate: IHobbyData, userEmail: string }, headers: HeadersInit) {

    const url = await getBaseUrl();

    if (!url) {
        return false;
    }

    if (!userEmail) {
        toast.error("You are not authorized to do this!~no email")
        return false;
    }

    if (!hobbyToCreate) {
        toast.error("No hobby data provided!");
        return false;
    }

    try {

        const res = await fetch(`${url}/api/create/hobby`, {
            method: 'POST',
            body: JSON.stringify({ hobbyToCreate: hobbyToCreate, user_email: userEmail }),
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
        console.log('Hobby created:', data.newHobby);
        const currHobbyData = useDataStore.getState().hobbyData;
        useDataStore.getState().setHobbyData([...currHobbyData, data.newHobby]);

        return true;

    } catch (error) {
        return false
    }
}