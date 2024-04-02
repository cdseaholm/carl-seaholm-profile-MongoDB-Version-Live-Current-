'use server'

import { validateRequest } from "@/lib/auth";
import { lucia } from "@/lib/lucia";
import { ActionResult } from "next/dist/server/app-render/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logout(): Promise<ActionResult> {

    const { session } = await validateRequest();
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