import { getBaseUrl } from "@/utils/helpers/helpers";

export async function DeleteUser(headers: HeadersInit) {
    const url = await getBaseUrl();

    if (!url) {
        return false;
    }
    
    try {
        const response = await fetch(`${url}/api/user`, {
            method: 'DELETE',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
        });
        if (!response) {
            return false;
        }
        const data = await response.json();
        if (!data) {
            return false;
        }
        if (data.status !== 200) {
            return false;
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}