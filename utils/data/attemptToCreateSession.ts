import { IEntry } from "@/models/types/entry";
import { toast } from "sonner";

export async function AttemptCreateSession({ userID, newEntry, hobbyTitle }: { userID: string, newEntry: IEntry, hobbyTitle: string }) {

    if (!userID) {
        toast.error("You are not authorized to do this!")
        return {worked: false, newIndex: -1};
    }

    try {

        const res = await fetch(`/api/${userID}/logsession`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newEntry: newEntry,
                user: userID,
                hobbyTitle: hobbyTitle
            }),

        });
        const data = await res.json();
        console.log('data: ', data);
        if (data.status !== 200) {
            console.log('Error creating session');
            return {worked: false, newIndex: -1};
        }

        let newIndex = data.newIndex as number;
        if (!newIndex) {
            return {worked: false, newIndex: -1}
        }
        
        return {worked: true, newIndex: newIndex};

    } catch (error) {
        console.error('Error updating session', error);
        return {worked: false, newIndex: -1};
    }
}