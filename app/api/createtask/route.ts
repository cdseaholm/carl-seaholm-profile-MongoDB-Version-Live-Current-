
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Task from "@/models/task";
import { createErrorResponse } from "@/lib/utils";


export async function POST(request: Request) {

    try {
        await connectDB();
        const data = await request.json();
        const taskToAdd = await Task.create({
            title: data.title,
            date: data.date,
            time: data.time,
            description: data.description,
            user_email: data.user_email
        });
        taskToAdd.save();
        if (!taskToAdd) {
            return createErrorResponse("Task not created", 404);
        }
    } catch (error: any) {
        console.error('Error creating task', error);
        return createErrorResponse("Task not created - outside catch", 500);
    }
    return NextResponse.json({status: 200});
}