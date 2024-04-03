import { Lucia } from "lucia";
import { adapter } from '@/db';

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes) => {
        return {
            username: attributes.name
        };
    }
});