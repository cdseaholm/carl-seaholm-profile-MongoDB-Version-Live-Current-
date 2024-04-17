import { lucia } from '@/lib/lucia/lucia';
import ActualUser from '@/lib/models/user';
import { cookies } from 'next/headers';
import { Argon2id } from 'oslo/password';
import dbConnect from '@/utils/mongodb';

function isValidEmail(email: string): boolean {
    return /.+@.+/.test(email);
}

export async function POST(request: Request) {

    await dbConnect();

    const body = await request.json();

    if (!body.registerEmail || typeof body.registerEmail !== "string" || !isValidEmail(body.registerEmail)) {
		return new Response("Invalid email", {
			status: 401
		});
	}
	if (!body.registerPassword || typeof body.registerPassword !== "string" || body.registerPassword.length < 6) {
		return new Response("Invalid password", {
			status: 402
		});
	}

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

        if (!userSave) {

            return Response.json({status: 500, message: 'User not Saved'});
            
        }

        return Response.json({status: 200, user});

    } catch (error) {

        return Response.json({status: 500, message: 'Internal server error'});
    }
}