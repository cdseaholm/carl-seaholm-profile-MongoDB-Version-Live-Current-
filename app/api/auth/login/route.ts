
import { cookies } from 'next/headers';
import { Argon2id } from 'oslo/password';
import ActualUser from '@/models/user';
import Session from '@/models/session';
import dbConnect from '@/lib/mongodb';
import { lucia } from '@/lib/lucia/lucia';
import { createErrorResponse } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        await dbConnect();

        const body = await request.json();

        if (!body.loginEmail || typeof body.loginEmail !== "string") {
            return new NextResponse(JSON.stringify({status: 400, message: "Invalid email"}));
        }
        if (!body.loginPassword || typeof body.loginPassword !== "string") {
            return new NextResponse(JSON.stringify({status: 401, message: "Invalid password"}));
        }

        const user = await ActualUser.findOne({email: body.loginEmail});
        
        if (!user) {
            return new NextResponse(JSON.stringify({status: 404, message: 'No user found'}));
        } else {
            const validPassword = await new Argon2id().verify(
                user.password,
                body.loginPassword
            );
            if (!validPassword) {
                return new NextResponse(JSON.stringify({status: 402, message: 'Password is incorrect'}));
            } else {
                
                const sessionExisting = await Session.findOne({user_id: user._id});
                if (sessionExisting) {
                    await Session.deleteOne({user_id: user._id});
                }
                const session = await lucia.createSession(user._id, sessionExisting?.id);
                const sessionCookie = lucia.createSessionCookie(session.id);
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes
                );

                return new NextResponse(JSON.stringify({status: 200, user}));
            }
        }
    } catch (error: any) {
        if (error.code === 11000) {
            return createErrorResponse("User with email already exists", 409);
          }
      
          return createErrorResponse(error.message, 500);
        }
}