'use server'

import { cookies } from "next/headers";
import type { Session } from "lucia";
import type { ActualUser } from "@/types/user";
import {lucia} from "../lucia/lucia";

export async function validateRequest(): Promise<{ user: ActualUser; session: Session } | { user: null; session: null }> {
  console.log('validateRequest function called');
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  console.log("Session ID:", sessionId);
  if (!sessionId) {
    return {
      user: null,
      session: null
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch {}

  return result as { user: { id: number; email: string; name: string | null; password: string; blogsub: boolean }; session: Session } | { user: null; session: null; };
}

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<ActualUser, "id">;
  }
}