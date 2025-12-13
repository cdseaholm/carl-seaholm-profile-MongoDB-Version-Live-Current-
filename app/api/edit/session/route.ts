
import connectDB from "@/lib/mongodb";
import HobbyData from "@/models/hobbyData";
import Session from "@/models/session";
import { EditSessionType } from "@/models/types/edit-session";
import { IHobbyData } from "@/models/types/hobbyData";
import { ITimeFrequency } from "@/models/types/time-frequency";
import { getServerSession, User } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
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
        const sessionToEdit = body.sessionToEdit as EditSessionType;

        if (!sessionToEdit) {
            return NextResponse.json({ status: 400, message: "No session to edit" });
        }

        if (!body.user_email) {
            return NextResponse.json({ status: 400, message: "User must be signed in" });
        }

        if (email === '') {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const hobbyTitle = sessionToEdit.hobbyTitle;

        if (!hobbyTitle) {
            return NextResponse.json({ status: 400, message: "Session must have a title" });
        }

        const seshInfo = sessionToEdit.sessionInfo;

        if (!seshInfo || !seshInfo._id) {
            return NextResponse.json({ status: 400, message: "No session info provided" });
        }

        const newSeshValue = Number(sessionToEdit.sessionTime);
        
        if (newSeshValue === 0) {
            const deleteResult = await Session.deleteOne({ _id: seshInfo._id.toString() });

            if (deleteResult.deletedCount === 0) {
                return NextResponse.json({ status: 404, message: "Session not found" });
            }

            // Update frequency (decrement old time)
            const hobbyFound = await HobbyData.findOne({ title: hobbyTitle }) as IHobbyData;
            if (hobbyFound) {
                const hobbyTimeFreq = hobbyFound.timeFrequency ? [...hobbyFound.timeFrequency] : [] as ITimeFrequency[];
                const oldFreq = hobbyTimeFreq.find((tf) => tf.time === oldSeshValue);
                
                if (oldFreq) {
                    oldFreq.frequency = Math.max(0, oldFreq.frequency - 1);
                    if (oldFreq.frequency === 0) {
                        const index = hobbyTimeFreq.indexOf(oldFreq);
                        if (index > -1) hobbyTimeFreq.splice(index, 1);
                    }
                }

                await HobbyData.updateOne(
                    { _id: hobbyFound._id?.toString() },
                    { timeFrequency: hobbyTimeFreq, updatedAt: new Date() }
                );
            }

            return NextResponse.json({ status: 200, message: 'Session deleted (time set to 0)' });
        }

        const oldSeshValue = seshInfo.minutes;

        if (newSeshValue <= 0 || oldSeshValue <= 0 || isNaN(newSeshValue) || isNaN(oldSeshValue)) {
            return NextResponse.json({ status: 400, message: "Invalid session time provided" });
        }

        if (newSeshValue === oldSeshValue) {
            return NextResponse.json({ status: 200, message: "No changes to update" });
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
            if (oldSeshValueFreq.frequency === 0) {
                const index = hobbyTimeFreq.indexOf(oldSeshValueFreq);
                if (index > -1) hobbyTimeFreq.splice(index, 1);
            }
        }

        // ✅ Increment new time frequency (or create if doesn't exist)
        const newSeshValueFreq = hobbyTimeFreq.find((timeFreq) => timeFreq.time === newSeshValue);

        if (newSeshValueFreq) {
            newSeshValueFreq.frequency += 1;
        } else {
            hobbyTimeFreq.push({ time: newSeshValue, frequency: 1 });
        }

        // ✅ Update both hobby and session
        await HobbyData.updateOne(
            { _id: hobbyId },
            {
                timeFrequency: hobbyTimeFreq,
                updatedAt: new Date()
            }
        );

        await Session.updateOne(
            { _id: seshInfo._id.toString() },
            {
                minutes: newSeshValue,
                updatedAt: new Date()
            }
        );

        return NextResponse.json({ status: 200, message: 'Session edited successfully!' });
    } catch (error: any) {
        console.error('Error editing session:', error);
        return NextResponse.json({ status: 500, message: "Failed to edit session" });
    }
}