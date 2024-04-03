'use server'

import { validateRequest } from "@/lib/auth"; 
import type { Session as SessionType } from "lucia";
import type { ActualUser } from '../../../types/user'

export default async function Session(): Promise<{user: ActualUser | null; session: SessionType | null}> { 
    console.log('Session function called');
    const session = await validateRequest(); 
    if (session) { 
        return session; 
    } else {
        return { user: null, session: null }; 
    }
}