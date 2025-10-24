import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import Session from "@/models/session";
import User from "@/models/user";
import { ISession } from "@/models/types/session";
import HobbyData from "@/models/hobbyData";
import { ITimeFrequency } from "@/models/types/time-frequency";

export async function POST(req: NextRequest) {
    const secret = process.env.NEXTAUTH_SECRET || '';

    if (secret === '') {
        return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }

    const session = await getServerSession({ req, secret });
    const token = await getToken({ req, secret });

    if (!session || !token) {
        return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }

    try {
        await connectDB();

        const userEmail = session.user?.email;
        if (!userEmail) {
            return NextResponse.json({ status: 401, message: 'User email not found' });
        }

        const body = await req.json();
        const newSesh = body.newSession as ISession;

        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found' });
        }
        const userId = user._id.toString();

        if (!newSesh) {
            return NextResponse.json({
                status: 400,
                message: 'Missing required fields: hobbyTitle, sessionData, date'
            });
        }

        const hobby = await HobbyData.findOne({ userId: userId, title: newSesh.hobbyTitle });
        if (!hobby) {
            return NextResponse.json({ status: 404, message: 'Hobby not found' });
        }
        const timeFreq = hobby.timeFrequency as ITimeFrequency[];
        //console.log('Current time frequency:', timeFreq);
        if (timeFreq === undefined || timeFreq === null) {
            hobby.timeFrequency = [] as ITimeFrequency[];
        }
        const existingFreqIndex = hobby.timeFrequency.findIndex((freq) => freq.time === newSesh.minutes);
        if (existingFreqIndex === -1) {
            hobby.timeFrequency.push({ time: newSesh.minutes, frequency: 1 });
        } else {
            hobby.timeFrequency[existingFreqIndex].frequency += 1;
        }
        //console.log('Updated time frequency:', hobby.timeFrequency);
        await hobby.save();

        const newSession = {
            userId: userId,
            hobbyTitle: newSesh.hobbyTitle,
            date: newSesh.date,
            minutes: newSesh.minutes,
            month: newSesh.month,
            year: newSesh.year,
            createdAt: new Date(),
            updatedAt: new Date()
        } as ISession;

        const created = await Session.create(newSession);

        if (!created) {
            return NextResponse.json({
                status: 500,
                message: 'Failed to create session entry'
            });
        }


        return NextResponse.json({
            status: 200,
            message: 'Session logged successfully'
        });

    } catch (error) {
        console.error('Error logging session:', error);
        return NextResponse.json({
            status: 500,
            message: 'Internal server error',
            error: error?.toString()
        });
    }
}