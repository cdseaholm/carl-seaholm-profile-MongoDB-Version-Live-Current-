
import { cookies } from 'next/headers';
import { Argon2id } from 'oslo/password';
import ActualUser from '@/lib/models/user';
import Session from '@/lib/models/session';
import dbConnect from '@/utils/mongodb';
import { lucia } from '@/lib/lucia/lucia';

export async function POST(request: Request) {

        await dbConnect();
        const body = await request.json();

        if (!body.loginEmail || typeof body.loginEmail !== "string") {
            return new Response(JSON.stringify({message: "Invalid email"}), {
                status: 400
            });
        }
        if (!body.loginPassword || typeof body.loginPassword !== "string") {
            return new Response(JSON.stringify({message: "Invalid password"}), {
                status: 400
            });
        }

        const user = await ActualUser.findOne({email: body.loginEmail});
        
        if (!user) {
            return new Response(JSON.stringify({message: 'No user found'}), {status: 404});
        } else {
            const validPassword = await new Argon2id().verify(
                user.password,
                body.loginPassword
            );
            if (!validPassword) {
                return new Response(JSON.stringify({message: 'Password is incorrect'}), {status: 402});
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

                return new Response(JSON.stringify({status: 200, user}), {status: 200});
            }
        }
}