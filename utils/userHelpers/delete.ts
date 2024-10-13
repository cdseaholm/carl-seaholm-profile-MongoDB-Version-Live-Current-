import { getCsrfToken, getSession } from "next-auth/react";

export async function DeleteUser({userID, urlToUse}: {userID: string, urlToUse: string}) {
    try {
        const auth = await getSession();
        if (!auth) {
            console.log('Not authenticated');
            return false;
        }
        const token = getCsrfToken();
        if (!token) {
            console.log('No token');
            return false
        }
        const response = await fetch(urlToUse + '/api/' + userID + '/deleteUser', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return true;
        } else {
            console.log('Failed to delete user');
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}