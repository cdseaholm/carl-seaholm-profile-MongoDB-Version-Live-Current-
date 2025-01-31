import connectDB from "@/lib/mongodb";
import MongoUser from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { IEntry } from "@/models/types/entry";
import { IUser } from "@/models/types/user";
import { getServerSession, User } from "next-auth";
import { getToken } from "next-auth/jwt";

const checkObjectName = (objectName: string) => {
    const lowerName = objectName.toLowerCase();
    const isValid = /^[a-z]+$/.test(lowerName);
    return isValid ? lowerName : '';
}

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
        const entry = body.entry as IEntry;
        const objectTitle = body.objectTitle as string;

        if (!entry?.value.value) {
            return NextResponse.json({ status: 400, message: 'Invalid custom field' });
        }

        if (email === '') {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const user = await MongoUser.findOne({ email: email }) as IUser;

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
                {/** const existingObject = user.userObjects[existingObjectIndex] as IUserObject;
                const updatedEntry = [...existingObject.entries, entry] as IEntry[];
                if (updatedEntry) {
                    existingObject. = updatedEntry as IEntry[];
                } */}
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