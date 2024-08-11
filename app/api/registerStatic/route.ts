
import Argon2id from 'argon2';
import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import { createErrorResponse } from '@/lib/utils';
import { ICustomField } from '@/models/types/customField';

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

        const existingUser = await User.findOne({email: body.registerEmail});

        if (existingUser) {
            return createErrorResponse("User already exists", 404);
        }

        if (!body.registerPassword) {
            return createErrorResponse("Password is required", 405);
        }

        const hashedPassword = await Argon2id.hash(body.registerPassword);

        try {
            const user = await User.create({
                name: body.registerName, 
                email: body.registerEmail, 
                blogsub: body.registerBlogsub ? true : false, 
                password: hashedPassword,
                customFields: [] as ICustomField[]
            });

            if (!user) {

                return createErrorResponse("User not created", 406);
                
            }

            return NextResponse.json({status: 200, user});

        } catch (error) {

            return createErrorResponse("Second Catch", 500);
        }
    } catch (error: any) {
        return createErrorResponse('Top Catch', 500);
    }
}