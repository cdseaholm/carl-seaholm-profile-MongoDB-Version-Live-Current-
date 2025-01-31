import { getBaseUrl } from "@/utils/helpers/helpers";

export async function AttemptToDeleteHobbies(headers: HeadersInit) {

    const urlToUse = await getBaseUrl();

    try {

        const res = await fetch(`${urlToUse}/api/delete/hobbies`, {
            method: 'DELETE',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            }
        });

        if (!res) {
            return false;
        }

        const data = await res.json();

        if (data.status !== 200) {
            console.log(data.status);
            return false;
        }

        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}