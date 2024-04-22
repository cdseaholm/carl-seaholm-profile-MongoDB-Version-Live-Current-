import connectDB from "@/lib/mongodb";
import { createErrorResponse } from "@/lib/utils";
import Hobby from "@/models/hobby";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        
        await connectDB();

        const user = await User.findOne({email: body.user});
        console.log('user', user);

        if (!user) {
            return createErrorResponse("User not found", 404);
        }

        const oldHobbyFormat = await Hobby.findById(body.id);
        console.log('oldHobbyFormat', oldHobbyFormat);
        
        if (!oldHobbyFormat) {
            return createErrorResponse("Hobby not found", 404);
        }

        const logSession = await Hobby.findByIdAndUpdate(body.id, {
            $push: {
                dates: [...oldHobbyFormat.dates, body.date],
                minutesXsessions: [...oldHobbyFormat.minutesXsessions, body.time],
            }
        });
        console.log('logSession', logSession);

        if (!logSession) {
            return createErrorResponse("Session not logged", 500);
        }

    }
    catch (error: any) {
        return createErrorResponse('Session not logged - catch outer', 500);
    }

    return NextResponse.json({status: 200});
}

        