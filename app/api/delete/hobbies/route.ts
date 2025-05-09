import connectDB from "@/lib/mongodb";
import MongoUser from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession, User } from "next-auth";
import { getToken } from "next-auth/jwt"
import { IUser } from "@/models/types/user";

export async function DELETE(req: NextRequest): Promise<NextResponse> {

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
        //const body = await req.json();
        await connectDB();
        const userSesh = session?.user as User;
        const email = userSesh ? userSesh.email : '';
        if (email === '') {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const user = await MongoUser.findOne({ email: email }) as IUser;

        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found' });
        }

        const hobbiesIndex = user.userObjects.findIndex((object) => object.title === 'hobbies');

        if (hobbiesIndex === -1) {
            return NextResponse.json({ status: 403 });
        }

        const result = await MongoUser.updateOne(
            { email: email },
            { $pull: { userObjects: { title: 'hobbies' } } }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ status: 500 })
        }
        return NextResponse.json({ status: 200 })

    } catch (error) {
        return NextResponse.json({ status: 500 })
    }
}
