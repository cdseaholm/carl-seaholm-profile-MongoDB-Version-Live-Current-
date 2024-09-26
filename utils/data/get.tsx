import { getBaseUrl } from "../helpers/helpers";

export async function GetData() {

    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const urlToUse = getBaseUrl();

    try {
        const res = await fetch(urlToUse + '/api/' + userID + '/getUserInfo',
            {
                cache: 'force-cache',
                next: { tags: ['userInfo'] }
            });

        const data = await res.json();

        if (data.status !== 200) {
            return { message: 'Error getting data', data: null };
        }

        return { message: 'Data retrieved', userData: data.userInfo };

    } catch (error) {
        return { message: 'Error getting data', data: null };
    }

}