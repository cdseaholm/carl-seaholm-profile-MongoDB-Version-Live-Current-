
import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import { SaltAndHashPassword } from '@/utils/userHelpers/saltAndHashPassword';
import { IFieldObject } from '@/models/types/field';
import { IUser } from '@/models/types/user';
import { IEntry } from '@/models/old/types/entry';
import { IUserObject } from '@/models/old/types/userObject';

export async function POST(request: Request) {

    try {
        const body = await request.json();
        await connectDB();

        if (!body.registerEmail) {
            return NextResponse.json({ status: 403, message: `Invalid Email`, user: {} as IUser });
        }
        if (!body.registerPassword) {
            return NextResponse.json({ status: 403, message: `Invalid Password`, user: {} as IUser });
        }

        const existingUser = await User.findOne({ email: body.registerEmail });

        if (existingUser) {
            return NextResponse.json({ status: 404, message: `User already exists`, user: {} as IUser });
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
            }) as IUser;

            if (!user) {
                return NextResponse.json({ status: 406, message: 'User not created', user: {} as IUser });
            }

            return NextResponse.json({ status: 200, message: 'success', user: user });

        } catch (error) {

            return NextResponse.json({ status: 500, message: `Error catch 1: ${error}`, user: {} as IUser });
        }
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: `Error catch 2: ${error}`, user: {} as IUser });
    }
}