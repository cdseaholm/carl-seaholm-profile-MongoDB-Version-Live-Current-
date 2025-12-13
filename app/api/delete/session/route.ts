import { EditSessionType } from '@/models/types/edit-session';
import connectDB from "@/lib/mongodb";
import HobbyData from "@/models/hobbyData";
import Session from "@/models/session";
import { IHobbyData } from "@/models/types/hobbyData";
import { ITimeFrequency } from "@/models/types/time-frequency";
import { getServerSession, User } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const secret = process.env.NEXTAUTH_SECRET ? process.env.NEXTAUTH_SECRET : '';

    if (secret === '') {
        return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }

    const session = await getServerSession({ req, secret });
    const token = await getToken({ req, secret });

    if (!session || !token) {
        return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }

    try {
        const body = await req.json();
        await connectDB();
        const userSesh = session?.user as User;
        const email = userSesh ? userSesh.email : '';
        const sessionToDelete = body.sessionToDelete as EditSessionType;

        if (!sessionToDelete) {
            return NextResponse.json({ status: 400, message: "No session to delete" });
        }

        if (!body.user_email) {
            return NextResponse.json({ status: 400, message: "User must be signed in" });
        }

        if (email === '') {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const hobbyTitle = sessionToDelete.hobbyTitle;

        if (!hobbyTitle) {
            return NextResponse.json({ status: 400, message: "Session must have a title" });
        }

        const seshInfo = sessionToDelete.sessionInfo;

        if (!seshInfo || !seshInfo._id) {
            return NextResponse.json({ status: 400, message: "No session info provided" });
        }

        const oldSeshValue = seshInfo.minutes;

        if (oldSeshValue <= 0 || isNaN(oldSeshValue)) {
            return NextResponse.json({ status: 400, message: "Invalid session time provided" });
        }

        const hobbyFound = await HobbyData.findOne({ title: hobbyTitle }) as IHobbyData;

        if (!hobbyFound) {
            return NextResponse.json({ status: 404, message: "Hobby not found" });
        }

        const hobbyId = hobbyFound._id?.toString();

        if (!hobbyId) {
            return NextResponse.json({ status: 404, message: "Hobby ID not found" });
        }

        // ✅ Clone the array to avoid mutation issues
        const hobbyTimeFreq = hobbyFound.timeFrequency ? [...hobbyFound.timeFrequency] : [] as ITimeFrequency[];

        // ✅ Decrement old time frequency
        const oldSeshValueFreq = hobbyTimeFreq.find((timeFreq) => timeFreq.time === oldSeshValue);

        if (oldSeshValueFreq) {
            oldSeshValueFreq.frequency = Math.max(0, oldSeshValueFreq.frequency - 1);
            
            // ✅ Optional: Remove frequency entry if it reaches 0
            // This keeps the array clean
            if (oldSeshValueFreq.frequency === 0) {
                const index = hobbyTimeFreq.indexOf(oldSeshValueFreq);
                if (index > -1) {
                    hobbyTimeFreq.splice(index, 1);
                }
            }
        }

        // ✅ Update hobby frequency and delete session
        await HobbyData.updateOne(
            { _id: hobbyId }, 
            { 
                timeFrequency: hobbyTimeFreq, 
                updatedAt: new Date() 
            }
        );

        const deleteResult = await Session.deleteOne({ _id: seshInfo._id.toString() });

        if (deleteResult.deletedCount === 0) {
            return NextResponse.json({ status: 404, message: "Session not found or already deleted" });
        }
        
        return NextResponse.json({ status: 200, message: 'Session deleted successfully!' });
    } catch (error: any) {
        console.error('Error deleting session:', error);
        return NextResponse.json({ status: 500, message: "Failed to delete session", error: error.message });
    }
}