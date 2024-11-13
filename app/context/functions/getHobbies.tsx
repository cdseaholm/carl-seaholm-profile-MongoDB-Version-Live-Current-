import { IHobby } from "@/models/types/hobby";
import { getBaseUrl } from "@/utils/helpers/helpers";

export async function getHobbies() {

    const userID = process.env.ADMIN_USERNAME as string;
    const url = await getBaseUrl()
    try {
        const response = await fetch(`${url}/api/${userID}/gethobbies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();

        if (data.status !== 200) {
            console.log('No hobbies found');
            return { success: false, hobbies: [] as IHobby[] };
        }

        return { success: true, hobbies: data.hobbies as IHobby[] };

    } catch (error) {
        console.error('Error fetching hobbies', error);
        return { success: false, hobbies: [] as IHobby[] };
    }
}