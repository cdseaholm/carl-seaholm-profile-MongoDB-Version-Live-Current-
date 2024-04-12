{/**'use server'

import { lucia } from "@/lib/lucia/lucia";
import { Session } from "lucia";
import { cookies } from "next/headers";

export async function logoutAuth(): Promise<boolean> {

    const sessionID = cookies().get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionID) {
      return false;
      
    }
  
    await lucia.invalidateSession(sessionID);
  
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return true;
  }*/}