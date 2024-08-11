
import { getCsrfToken, getSession } from "next-auth/react";

export async function CreateCustomField({ fieldTitle, value, type, urlToUse, customFieldObjectName }: { fieldTitle: string, value: string, type: any, urlToUse: string, customFieldObjectName: string }) {

    try {
        const token = await getCsrfToken();
        if (!token) {
            return {message: 'No token found', success: false};
        }
        const session = await getSession();
        if (!session) {
            return {message: 'No session found', success: false};
        }
        const user = session?.user?.email;
        if (!user) {
            return {message: 'No user found', success: false};
        }
        const response = await fetch(`${urlToUse}/api/${user}/createCustom`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ fieldTitle: fieldTitle, value: value, type: type, objectName: customFieldObjectName })
        });

        const data = await response.json();

        if (data.status !== 200) {
            return {message: 'Error creating custom field', success: false};
        }

        return {message: 'Custom field created', success: true};
    } catch (error) {
        console.error('Error creating custom field, error: ', error);
        return {message: 'Error creating custom field', success: false};
    }
}