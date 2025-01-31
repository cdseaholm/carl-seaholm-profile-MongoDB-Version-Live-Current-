import connectDB from "@/lib/mongodb";
import MongoUser from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession, User } from "next-auth";
import { getToken } from "next-auth/jwt"

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
        await connectDB();
        const userSesh = session?.user as User;
        const email = userSesh ? userSesh.email : '';
        if (email === '') {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const user = await MongoUser.findOneAndDelete({
            email: email
        });

        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found' });
        }

        return NextResponse.json({ status: 200, message: 'User deleted' });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: error.message });
    }

}