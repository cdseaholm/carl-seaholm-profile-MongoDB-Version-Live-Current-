
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Task from "@/models/task";
import { createErrorResponse, stringToObjectId } from "@/lib/utils";


export async function PUT(request: Request) {
    const taskID = request.url.split('/')[6];
    if (!request.body) {
        return createErrorResponse("Invalid request", 400);
    }
    console.log('checkTaskEDIT', taskID);

    try {
        await connectDB();
        const data = await request.json();
        const objectID = stringToObjectId(taskID);
        const taskInitial = await Task.findById(objectID);
        console.log('checkTaskEDIT', taskInitial);
        if (!taskInitial) {
            return createErrorResponse("Task not found", 404);
        }
        const taskToEdit = await Task.updateOne(
            { _id: objectID },
            {
                title: taskInitial.title,
                date: taskInitial.date,
                time: taskInitial.time,
                description: taskInitial.description,
                user_email: taskInitial.user_email,
                completed: data.completed,
                updatedAt: new Date()
            }
        );

        if (!taskToEdit) {
            return createErrorResponse("Task not edited", 404);
        }
    } catch (error: any) {
        console.error('Error editing task', error);
        return createErrorResponse("Task not edited - outside catch", 500);
    }
    return NextResponse.json({status: 200});
}