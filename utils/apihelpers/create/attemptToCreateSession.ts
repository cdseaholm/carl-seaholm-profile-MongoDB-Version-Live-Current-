import { IEntry } from "@/models/types/entry";
import { getBaseUrl } from "@/utils/helpers/helpers";

export async function AttemptCreateSession({ newEntry, hobbyTitle }: { newEntry: IEntry, hobbyTitle: string }, headers: HeadersInit) {

    const url = await getBaseUrl();

    if (!url) {
        return false;
    }

    try {

        const res = await fetch(`${url}/api/edit/logsession`, {
            method: 'PUT',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newEntry: newEntry,
                hobbyTitle: hobbyTitle
            }),

        });

        if (!res) {
            return { worked: false, newIndex: -1 }
        }

        const data = await res.json();

        if (!data) {
            return { worked: false, newIndex: -1 }
        }

        if (data.status !== 200) {
            console.log('Error creating session', data.message);
            return { worked: false, newIndex: -1 };
        }

        let newIndex = data.newIndex as number;
        if (!newIndex) {
            return { worked: false, newIndex: -1 }
        }

        return { worked: true, newIndex: newIndex };

    } catch (error) {
        console.error('Error updating session', error);
        return { worked: false, newIndex: -1 };
    }
}