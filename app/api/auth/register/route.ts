import { lucia } from '@/lib/auth';
import ActualUser from '@/types/user';
import { cookies } from 'next/headers';
import { Argon2id } from 'oslo/password';

export async function POST(request: Request) {
    const body = await request.json();
    const existingUser = await ActualUser.findOne({
        email: body.registerEmail
    });
    if (existingUser) {
        return Response.json({status: 409, message: 'User already exists'});
    }

    if (!body.registerPassword) {
        return Response.json({status: 400, message: 'Password is required'});
    }
    const hashedPassword = await new Argon2id().hash(body.registerPassword);

    try {
    const user = await new ActualUser({
        firstName: body.registerfirstName, 
        lastName: body.registerlastName, 
        email: body.registerEmail, 
        blogsub: body.registerBlogsub ? true : false, 
        password: hashedPassword
    });

    const userSave = await user.save();

    console.log(userSave);

    const session = await lucia.createSession(userSave._id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
    } catch (error) {
        console.log(error);
        return Response.json({status: 500, message: 'Internal server error'});
    }

    return Response.json({status: 200});
}