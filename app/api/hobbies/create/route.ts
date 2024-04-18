
import connectdb from "@/lib/mongodb";
import HobbyModel from "@/models/hobby";
import { NextResponse } from "next/server";


export async function POST(request: Request) {

    await connectdb();
    const data = await request.json();
    const hobbyToAdd = await HobbyModel.create({
        title: data.title,
        description: data.description,
        user_email: data.email,
        goals: data.goals,
        minutesXsessions: data.minutesXsessions,
        dates: data.dates,
        color: data.color,
    });
    if (!hobbyToAdd) {
        return NextResponse.json({status: 500, message: 'Error creating hobby'});
    }
    return NextResponse.json({status: 200});
}