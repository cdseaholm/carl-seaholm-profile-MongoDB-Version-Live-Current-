import { getBaseUrl } from "../helpers/helpers";

export default async function SendTempPW(email: string) {
    try {
        const urlToUse = getBaseUrl();
        const url = urlToUse + '/api/sendTempPW';
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email}),
        };
        fetch(url, options)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('error:', error));
    } catch (error) {
        console.error('error:', error);
    }
}