import { ITasksByUser } from "@/models/types/task";

export const getTasks = async (urlToUse: string, userID: string): Promise<ITasksByUser | null> => {
    try {
        const response = await fetch(`${urlToUse}/api/${userID}/gettasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            console.log('No tasks found');
            return null;
        }
        if (response.ok) {
            const res = await response.json();
            if (res.status === 404) {
                return null;
            }
            return res.tasks || null;
        }
    } catch (error) {
        console.error('Error fetching tasks', error);
        return null;
    }
    return null;
}