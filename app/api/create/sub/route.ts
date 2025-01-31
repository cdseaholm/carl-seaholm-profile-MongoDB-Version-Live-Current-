import connectDB from "@/lib/mongodb";
import MongoUser from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "@/models/types/user";
import { getServerSession, User } from "next-auth";
import { getToken } from "next-auth/jwt";
import Subscriber from "@/models/subscribers";

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

        if (email === '') {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const user = await MongoUser.findOne({ email: email }) as IUser;

        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found' });
        }

        if (!body.modalSubEmail) {
            return NextResponse.json({ status: 401, message: "Email is required" });
        }

        const alreadySubbed = await Subscriber.findOne({ email: body.modalSubEmail });

        if (alreadySubbed) {
            return NextResponse.json({ status: 402, message: "Subscriber already exists" });
        }
        const newSub = await Subscriber.create({
            email: body.modalSubEmail,
            name: body.modalSubName,
            subscribed: true
        });

        newSub.save();

        if (!newSub) {
            return NextResponse.json({ status: 500, message: "Subscriber not created - Second Catch" });
        }
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: 'Subscriber not created - Top Catch' });
    }

    return NextResponse.json({ status: 200, message: 'Subscriber added successfully' });
}