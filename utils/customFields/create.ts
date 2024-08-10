import { CustomField } from "@/models/types/customField";
import { getCsrfToken, getSession } from "next-auth/react";

export async function CreateCustomField({ customField, urlToUse }: { customField: CustomField, urlToUse: string }) {
    try {
        const token = await getCsrfToken();
        if (!token) {
            throw new Error('No CSRF token found!');
        }
        const session = await getSession();
        if (!session) {
            throw new Error('No session found!');
        }
        const user = session?.user?.email;
        if (!user) {
            throw new Error('No user found in session!');
        }
        const response = await fetch(`${urlToUse}/api/${user}/createCustom`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({customField: customField})
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }
        return data.message;
    } catch (error) {
        console.error('Error creating custom field, error: ', error);
    }
}