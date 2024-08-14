
import { IUserObject } from "@/models/types/userObject";
import { getCsrfToken, getSession } from "next-auth/react";
import { getBaseUrl } from "../helpers/helpers";
import { IEntry } from "@/models/types/objectEntry";

export async function CreateCustomEntry({ entry, objectTitle }: { entry: IEntry, objectTitle: string }) {

    const urlToUse = getBaseUrl();

    try {
        const token = await getCsrfToken();
        if (!token) {
            return {message: 'No token found', created: false};
        }
        const session = await getSession();
        if (!session) {
            return {message: 'No session found', created: false};
        }
        const user = session?.user?.email;
        if (!user) {
            return {message: 'No user found', created: false};
        }
        const response = await fetch(`${urlToUse}/api/${user}/createEntry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ entry: entry, objectTitle: objectTitle })
        });

        const data = await response.json();

        if (data.status !== 200) {
            return {message: 'Error creating custom entry', created: false};
        }

        return {message: 'Custom entry created', created: true};
    } catch (error) {
        console.error('Error creating custom entry, error: ', error);
        return {message: 'Error creating custom entry', created: false};
    }
}

export async function CreateCustomObject({object}: {object: IUserObject}) {
    const session = await getSession();
    const authToken = await getCsrfToken();
    const urlToUse = getBaseUrl();

    try {
        if (session === null || session === undefined || session.user === null || session.user === undefined || session.user.email === null || session.user.email === undefined) {
            return {created: false, message: 'Unauthorized'};
        }

        const userID = session.user.email;

        const response = await fetch(`${urlToUse}/api/${userID}/createObject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({object: object}),
        });
        const res = await response.json();
        console.log('res', res);
        if (res.status === 404) {
            return {created: false, message: 'User not found'};
        }
        if (res.status !== 200) {
            return {created: false, message: res.message};
        }
        return {created: true, message: 'Custom object created'};
    } catch (error) {
        return {created: false, message: 'Error creating custom object'};
    }
}