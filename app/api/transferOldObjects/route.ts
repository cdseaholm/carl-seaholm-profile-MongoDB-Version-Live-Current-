import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { IUserObject } from "@/models/types/userObject";
import User from "@/models/user";
import { IUser } from "@/models/types/user";
import { IFieldObject } from "@/models/types/field";
import { IEntry } from "@/models/types/entry";

export async function PUT(req: NextRequest): Promise<NextResponse> {

    try {
        await connectDB();
        const body = await req.json();
        const userID = body.userID as string;
        const newObjects = body.newObjects as [IFieldObject[], IEntry[], IUserObject[]];

        const user = await User.findOne({ email: userID }) as IUser;

        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found' });
        }

        const fieldObjects = newObjects[0] ? newObjects[0] as IFieldObject[] : [] as IFieldObject[];
        const entries = newObjects[1] ? newObjects[1] as IEntry[] : [] as IEntry[];
        const userObjects = newObjects[2] ? newObjects[2] as IUserObject[] : [] as IUserObject[];
        
        user.fieldObjects = fieldObjects;
        user.entries = entries;
        user.userObjects = userObjects;

        try {
            await user.save();
        } catch (error) {
            console.error('Error saving user: ', error);
            return NextResponse.json({ status: 500, message: 'Error saving user' });
        }

        return NextResponse.json({ status: 200, message: 'Both Updated' });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: error.message });
    }
}