
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Hobby from "@/models/hobby";
import { createErrorResponse } from "@/lib/utils";


export async function POST(request: Request) {

    try {
        await connectDB();
        const data = await request.json();
        if (!data.title) {
            return createErrorResponse("Invalid title", 400);
        }
        if (!data.user_email) {
            return createErrorResponse("User must be signed in", 400);
        }

        const hobbyToAdd = await Hobby.create({
            title: data.title,
            descriptions: data.descriptions,
            user_email: data.user_email,
            goals: data.goals,
            minutesXsessions: data.minutesXsessions,
            dates: data.dates,
            color: data.color,
        });
        hobbyToAdd.save();
        if (!hobbyToAdd) {
            return createErrorResponse("Hobby not created", 404);
        }
    } catch (error: any) {
        console.error('Error creating hobby', error);
        return createErrorResponse("Hobby not created - outside catch", 500);
    }
    return NextResponse.json({status: 200});
}