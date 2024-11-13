{/**import { IEntry } from "@/models/types/entry";
import { Session } from "next-auth";

export async function AttemptUpdateCheckbox({ passedTask, urlToUse, session }: { passedTask: IEntry, urlToUse: string, session: Session | null }) {
    const user = session ? session.user : null;
    const userID = user?.email ? user.email : '';

    try {
        const updatedTask = await fetch(`${urlToUse}/api/${userID}/edittask/${passedTask._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: passedTask.fields.find((entry) => entry.name === 'completed')?.value
            })
        });
        if (!updatedTask.ok) {
            console.log('Failed to update task');
            return false;
        }
        if (updatedTask.ok) {
            const res = await updatedTask.json();
            console.log('Task updated', res);
            return true;
        }
    } catch (error) {
        console.error('Error updating task', error);
        return false;
    }

    return false;
} */}