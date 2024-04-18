'use server'

import { lucia } from "@/lib/lucia/lucia";
import { cookies } from "next/headers";
import dbConnect from '@/lib/mongodb';
import ActualUser from '@/models/user';
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    await dbConnect();

    const body = await request.json();
    
    if (!body.user) {
        return NextResponse.json({status: 401, message: 'Unauthorized'});
    }

    const user = await ActualUser.findOne({email: body.user.email})
    if (!user) {
        return NextResponse.json({status: 404, message: 'User not found'});
    }
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    console.log(sessionId);

    if (!sessionId || sessionId === null) {
      return NextResponse.json({status: 401, message: 'Not logged in'});
    }

    await lucia.invalidateSession(sessionId);
    
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
    return NextResponse.json({status: 200, message: 'Logged out'});
}