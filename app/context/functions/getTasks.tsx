import { ITask } from "@/models/types/task";

export const getTasks = async (urlToUse: string, userID: string): Promise<ITask[]> => {
    try {
        const response = await fetch(`${urlToUse}/api/${userID}/gettasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.log('No tasks found');
            return [];
        }
        if (response.ok) {
            const res = await response.json();
            if (res.status === 404) {
                return [];
            }
            return res.tasks || [];
        }
    } catch (error) {
        console.error('Error fetching tasks', error);
        return [];
    }
    return [];
}