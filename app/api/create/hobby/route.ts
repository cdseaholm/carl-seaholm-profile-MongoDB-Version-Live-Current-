import connectDB from "@/lib/mongodb";
import MongoUser from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "@/models/types/user";
import { getServerSession, User } from "next-auth";
import { getToken } from "next-auth/jwt";
import HobbyData from "@/models/hobbyData";
import { IHobbyData } from "@/models/types/hobbyData";

export async function POST(req: NextRequest) {

    const secret = process.env.NEXTAUTH_SECRET ? process.env.NEXTAUTH_SECRET : '';

    if (secret === '') {
        return NextResponse.json({ status: 401, message: 'Unauthorized', newHobby: {} as IHobbyData });
    }

    const session = await getServerSession({ req, secret })
    const token = await getToken({ req, secret });

    if (!session || !token) {
        return NextResponse.json({ status: 401, message: 'Unauthorized', newHobby: {} as IHobbyData });
    }

    try {
        const body = await req.json();
        await connectDB();
        const userSesh = session?.user as User;
        const email = userSesh ? userSesh.email : '';

        if (!body.hobbyToCreate) {
            return NextResponse.json({ status: 400, message: "No new hobby", newHobby: {} as IHobbyData });
        }

        if (!body.user_email) {
            return NextResponse.json({ status: 400, message: "User must be signed in", newHobby: {} as IHobbyData });
        }

        if (email === '') {
            return NextResponse.json({ status: 401, message: 'Unauthorized', newHobby: {} as IHobbyData });
        }

        const user = await MongoUser.findOne({ email: email }) as IUser;

        if (!user) {
            return NextResponse.json({ status: 404, message: "User not found", newHobby: {} as IHobbyData });
        }

        const newHobby = await HobbyData.create({
            userId: user._id.toString(),
            title: body.hobbyToCreate.title,
            description: body.hobbyToCreate.description,
            timeFrequency: body.hobbyToCreate.timeFrequency,
            category: body.hobbyToCreate.category,
            color: body.hobbyToCreate.color,
            isActive: body.hobbyToCreate.isActive,
            goals: body.hobbyToCreate.goals,
            createdAt: new Date(),
            updatedAt: new Date()
        }) as IHobbyData;

        return NextResponse.json({ status: 200, message: 'Created!', newHobby: newHobby as IHobbyData });
    } catch (error: any) {
        console.error('Error creating hobby', error);
        return NextResponse.json({ status: 500, message: "Hobby not created - outside catch", newHobby: {} as IHobbyData });
    }
}