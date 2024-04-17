'use server'

import { lucia } from "@/lib/lucia/lucia";
import { cookies } from "next/headers";
import dbConnect from '@/utils/mongodb';
import Session from '@/lib/models/session';
import ActualUser from '@/lib/models/user';

export async function POST(request: Request) {
    dbConnect();
    const body = await request.json();
    
    if (!body.user) {
        return Response.json({status: 401, message: 'Unauthorized'});
    }

    const user = await ActualUser.findOne({email: body.user.email})
    if (!user) {
        return Response.json({status: 404, message: 'User not found'});
    }
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    console.log(sessionId);

    if (!sessionId || sessionId === null) {
      return Response.json({status: 401, message: 'Not logged in'});
    }

    await lucia.invalidateSession(sessionId);
    
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
    return Response.json({status: 200, message: 'Logged out'});
}