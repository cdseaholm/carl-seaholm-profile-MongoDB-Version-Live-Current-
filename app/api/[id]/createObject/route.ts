import connectDB from "@/lib/mongodb";
import { IUserObject } from "@/models/types/userObject";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const userID = req.url.split('/')[4];

    try {
        await connectDB();
        const data = await req.json();
        const object = data.object as IUserObject;
        const user = await User.findOne({ email: userID });

        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found' });
        }

        const oldObjects = user.userObjects as IUserObject[];
        const newObjects = [...oldObjects, object];
        user.userObjects = newObjects;
        console.log('user: ', user, user.userObjects);
        await user.save();
        return NextResponse.json({ status: 200, message: 'Custom field created' });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: 'Error creating custom field' });
    }
}