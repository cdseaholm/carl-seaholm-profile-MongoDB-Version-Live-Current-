import connectDB from "@/lib/mongodb";
import { IUserObject } from "@/models/types/userObject";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { IEntry } from "@/models/types/objectEntry";

const checkObjectName = (objectName: string) => {
    const lowerName = objectName.toLowerCase();
    const isValid = /^[a-z]+$/.test(lowerName);
    return isValid ? lowerName : '';
}

export async function POST(req: NextRequest) {
    var userID = req.url.split('/')[4];
    try {
        if (!userID) {
            return NextResponse.json({ status: 400, message: 'Invalid user ID' });
        }
        console.log('Connecting to DB...');
        await connectDB();
        console.log('Connected to DB');
        const data = await req.json();
        const entry = data.entry as IEntry;
        const objectTitle = data.objectTitle as string;

        if (!entry?.fields[0]?.value) {
            return NextResponse.json({ status: 400, message: 'Invalid custom field' });
        }

        console.log('Finding user...');
        const user = await User.findOne({ email: userID });
        console.log('User found');

        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found' });
        }

        const checkedName = checkObjectName(objectTitle);
        if (!checkedName) {
            return NextResponse.json({ status: 400, message: 'Invalid custom field' });
        }

        if (user.userObjects.length > 0 && user.userObjects) {
            const existingObjectIndex = user.userObjects.findIndex((object) => object.title === checkedName);
            if (existingObjectIndex !== -1 && user.userObjects[existingObjectIndex]) {
                const existingObject = user.userObjects[existingObjectIndex] as IUserObject;
                const updatedEntry = [...existingObject.entries, entry] as IEntry[];
                if (updatedEntry) {
                    existingObject.entries = updatedEntry as IEntry[];
                }
            }
        } else {
            return NextResponse.json({ status: 404, message: 'Create Object, then add entry' });
        }
        await user.save();
        return NextResponse.json({ status: 200, message: 'Custom field created' });
    } catch (error: any) {
        console.error('Error creating custom field', error);
        return NextResponse.json({ status: 500, message: 'Error creating custom field' });
    }
}