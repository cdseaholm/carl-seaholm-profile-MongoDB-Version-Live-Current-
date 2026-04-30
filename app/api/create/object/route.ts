import connectDB from "@/lib/mongodb";
import MongoUser from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "@/models/types/user";
import { getServerSession, User } from "next-auth";
import { getToken } from "next-auth/jwt";
import { IUserObject } from "@/models/old/types/userObject";

export async function POST(req: NextRequest) {

    const secret = process.env.NEXTAUTH_SECRET ? process.env.NEXTAUTH_SECRET : '';

    if (secret === '') {
        return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }

    const session = await getServerSession({ req, secret })
    const token = await getToken({ req, secret });

    if (!session || !token) {
        return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }

    try {
        const body = await req.json();
        await connectDB();
        const userSesh = session?.user as User;
        const email = userSesh ? userSesh.email : '';
        const object = body.object as IUserObject;

        if (email === '') {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const user = await MongoUser.findOne({ email: email }) as IUser;

        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found' });
        }

        const oldObjects = user.userObjects as IUserObject[];
        const newObjects = [...oldObjects, object];
        user.userObjects = newObjects;

        try {
            const newUser = await user.save();
            console.log('user saved', newUser);
        } catch (error) {
            console.error('Error saving user:', error); // Log the error
            return NextResponse.json({ status: 500, message: 'Error saving user' });
        }

        return NextResponse.json({ status: 200, message: 'Custom field created' });

    } catch (error: any) {

        return NextResponse.json({ status: 500, message: 'Error creating custom field' });

    }
}