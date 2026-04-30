import { IEntry } from "@/models/old/types/entry";
import { IUserObject } from "@/models/old/types/userObject";
import { getBaseUrl } from "@/utils/helpers/helpers";


export async function CreateCustomEntry({ entry, objectTitle }: { entry: IEntry, objectTitle: string }, headers: HeadersInit) {

    const urlToUse = await getBaseUrl();

    try {

        const response = await fetch(`${urlToUse}/api/create/entry`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ entry: entry, objectTitle: objectTitle })
        });

        const data = await response.json();

        if (data.status !== 200) {
            return { message: 'Error creating custom entry', created: false };
        }

        return { message: 'Custom entry created', created: true };
    } catch (error) {
        console.error('Error creating custom entry, error: ', error);
        return { message: 'Error creating custom entry', created: false };
    }
}

export async function CreateCustomObject({ object }: { object: IUserObject }, headers: HeadersInit) {
    const urlToUse = getBaseUrl();

    try {

        const response = await fetch(`${urlToUse}/api/create/object`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ object: object }),
        });
        const res = await response.json();
        console.log('res', res);
        if (res.status === 404) {
            return { created: false, message: 'User not found' };
        }
        if (res.status !== 200) {
            return { created: false, message: res.message };
        }
        return { created: true, message: 'Custom object created' };
    } catch (error) {
        return { created: false, message: 'Error creating custom object' };
    }
}