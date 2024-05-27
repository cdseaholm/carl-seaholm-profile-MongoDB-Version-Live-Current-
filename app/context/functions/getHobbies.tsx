import { IHobby } from "@/models/types/hobby";

export const getHobbies = async (urlToUse: string, userID: string): Promise<IHobby[]> => {

    try {
        const response = await fetch(`${urlToUse}/api/${userID}/gethobbies`, {
            next: {
                revalidate: 3600
            }
        });
    
        if (!response.ok) {
            console.log('No hobbies found');
            return [];
        }
        if (response.ok) {
            const res = await response.json();
            return res.hobbies || [];
        }
    } catch (error) {
        console.error('Error fetching hobbies', error);
        return [];
    }
    return [];
}