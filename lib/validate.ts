'use server'

import { cookies } from 'next/headers';
import { lucia } from '@/lib/lucia/lucia';

import { User } from 'lucia';

export default async function getUser(): Promise<User | null> {

    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    console.log("sessionID",sessionId);

    if (!sessionId || sessionId === null) {
      return null;
    }

    const { user, session } = await lucia.validateSession(sessionId);

    try {
      if (session && session.fresh) {
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      } else if (!session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
    } catch {}

  return user;
};