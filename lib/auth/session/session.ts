{/**'use server'

import { validateRequest } from "@/lib/auth/auth"; 
import type { Session as SessionType } from "lucia";
import type { ActualUser } from '@/types/user'

export default async function Session(): Promise<{user: ActualUser | null; session: SessionType | null}> { 
    const session = await validateRequest(); 
    if (session) { 
        return session; 
    } else {
        return { user: null, session: null }; 
    }
}*/}