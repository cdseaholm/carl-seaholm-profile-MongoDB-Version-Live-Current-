import { lucia } from '@/lib/auth';
import { cookies } from 'next/headers';
import { Argon2id } from 'oslo/password';
import ActualUser from '@/types/user';

export async function POST(request: Request) {
    const body = await request.json();
    const user = await ActualUser.findOne({email: body.loginEmail});
    console.log(ActualUser)
    console.log(user);
    console.log(body);
    if (!user) {
        return Response.json({status: 404, message: 'No user found'})
    } else {
        console.log(typeof user.password, user.password);
        console.log(typeof body.loginPassword, body.loginPassword);
        const validPassword = await new Argon2id().verify(
            user.password,
            body.loginPassword
          );
          console.log(validPassword);
        if (!validPassword) {
            return Response.json({status: 402, message: 'Password is incorrect'})
        } else {
            const session = await lucia.createSession(user._id, {});
            console.log(session);
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );

            const usersToPass = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                blogsub: user.blogsub,
                password: user.password
            }

            return Response.json({status: 200, usersToPass});
        }
    }
}