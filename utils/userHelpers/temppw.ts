import { getBaseUrl } from "../helpers/helpers";

export default async function SendTempPW(email: string) {

    const urlToUse = await getBaseUrl();

    if (!urlToUse) {
        return false;
    }

    try {
        const url = urlToUse + '/api/sendTempPW';

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        };

        const res = await fetch(url, options)
        if (!res) {
            return false;
        }

        const data = await res.json();

        if (!data) {
            return false;
        }

        if (data.status !== 200) {
            return false;
        }

        return true;

    } catch (error) {
        console.error('error:', error);
        return false;
    }
}