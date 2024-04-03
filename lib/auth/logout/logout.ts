'use server'

import { lucia } from "@/lib/lucia/lucia";
import { Session } from "lucia";
import { ActionResult } from "next/dist/server/app-render/types";
import { cookies } from "next/headers";

export default async function logoutAuth({session}: {session: Session}): Promise<ActionResult> {

    if (!session) {
      return {
        error: "Unauthorized"
      };
    }
  
    await lucia.invalidateSession(session.id);
  
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      return 'Logged out successfully';
  }