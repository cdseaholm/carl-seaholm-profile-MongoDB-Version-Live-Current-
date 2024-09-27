
import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import { createErrorResponse } from '@/lib/utils';
import { IUserObject } from '@/models/types/userObject';

function isValidEmail(email: string): boolean {
    return /.+@.+/.test(email);
}

export async function POST(request: Request) {

    try {
        const body = await request.json();
        await connectDB();

        if (!body.registerEmail || typeof body.registerEmail !== "string" || !isValidEmail(body.registerEmail)) {
            return createErrorResponse("Invalid email", 402);
        }
        if (!body.registerPassword || typeof body.registerPassword !== "string" || body.registerPassword.length < 6) {
            return createErrorResponse("Invalid password", 403);
        }

        const existingUser = await User.findOne({ email: body.modalRegisterEmail });

        if (existingUser) {
            return createErrorResponse("User already exists", 404);
        }

        if (!body.registerPassword) {
            return createErrorResponse("Password is required", 405);
        }

        const hashedPassword = body.modalRegisterPassword;

        {/**const validPassword = await argon2id.verify(passwordToCheck, password); */ }

        try {
            const user = await User.create({
                name: body.modalRegisterName,
                email: body.modalRegisterEmail,
                blogsub: body.modalRegisterBlogsub ? true : false,
                password: hashedPassword,
                userObjects: [] as IUserObject[]
            });

            if (!user) {

                return createErrorResponse("User not created", 406);

            }

            return NextResponse.json({ status: 200, user });

        } catch (error) {

            return createErrorResponse("Second Catch", 500);
        }
    } catch (error: any) {
        return createErrorResponse('Top Catch', 500);
    }
}