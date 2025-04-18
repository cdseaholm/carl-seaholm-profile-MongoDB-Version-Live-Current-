import { getBaseUrl } from "@/utils/helpers/helpers";

export async function AttemptToDeleteRecipes(headers: HeadersInit) {

    const url = await getBaseUrl();

    if (!url) {
        return false;
    }

    try {
        const res = await fetch(`${url}/api/delete/recipes`, {
            method: 'DELETE',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            }
        });

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