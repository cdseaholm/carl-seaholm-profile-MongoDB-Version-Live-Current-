'use server'

import { cookies } from "next/headers";
import type { Session } from "lucia";
import type { User } from "@prisma/client";
import {lucia} from "./lucia";

let cachedResult: { user: { id: number; email: string; name: string | null; password: string; }; session: Session; } | { user: null; session: null; } | PromiseLike<{ user: { id: number; email: string; name: string | null; password: string; }; session: Session; } | { user: null; session: null; }> | null = null;

export async function validateRequest(): Promise<{ user: User; session: Session } | { user: null; session: null }> {
  if (cachedResult) {
    return cachedResult;
  }

  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
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

  cachedResult = result as { user: { id: number; email: string; name: string | null; password: string; }; session: Session } | { user: null; session: null };

  return cachedResult;
}

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<User, "id">;
  }
}