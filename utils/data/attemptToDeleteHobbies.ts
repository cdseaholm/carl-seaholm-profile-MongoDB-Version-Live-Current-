export async function AttemptToDeleteHobbies() {

    const userID = process.env.ADMIN_USERNAME as string;
    try {

        const res = await fetch(`/api/${userID}/delete/hobbies`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
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