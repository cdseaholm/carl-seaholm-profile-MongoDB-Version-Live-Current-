
import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import { createErrorResponse } from '@/lib/utils';
import { IUserObject } from '@/models/types/userObject';
import { SaltAndHashPassword } from '@/utils/userHelpers/saltAndHashPassword';
import { IEntry } from '@/models/types/entry';
import { IFieldObject } from '@/models/types/field';

export async function POST(request: Request) {

    try {
        const body = await request.json();
        await connectDB();

        if (!body.registerEmail) {
            return createErrorResponse("Invalid email", 402);
        }
        if (!body.registerPassword) {
            return createErrorResponse("Invalid password", 403);
        }

        const existingUser = await User.findOne({email: body.registerEmail});

        if (existingUser) {
            return createErrorResponse("User already exists", 404);
        }

        const hashedPassword = await SaltAndHashPassword(body.registerPassword);

        try {
            const user = await User.create({
                name: body.registerName, 
                email: body.registerEmail, 
                blogsub: body.registerBlogsub ? true : false, 
                password: hashedPassword,
                userObjects: [] as IUserObject[],
                entries: [] as IEntry[],
                fieldObjects: [] as IFieldObject[],
                resetPasswordToken: '',
                resetPasswordExpires: ''
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