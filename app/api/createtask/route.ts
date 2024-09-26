
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/utils";
import TasksByUser from "@/models/tasks/tasksByUser";

export async function POST(request: Request) {

    try {
        await connectDB();
        const data = await request.json();
        const usersTasks = await TasksByUser.findOne({ user_email: data.user_email }) as any;
        if (!usersTasks) {
            const taskToAdd = new TasksByUser({
                tasks: [{
                        title: data.title,
                        time: data.time,
                        description: data.description,
                        completed: data.completed,
                        user_email: data.user_email,
                        date: data.date,
                }] as any,
                user_email: data.user_email
            }) as any;
            await taskToAdd.save();
            return NextResponse.json({ status: 200, tasks: taskToAdd.tasks });
        } else {
            usersTasks.tasks.push({
                title: data.title,
                time: data.time,
                description: data.description,
                completed: data.completed,
                user_email: data.user_email,
                date: data.date
            });
            await usersTasks.save();
            return NextResponse.json({ status: 200, task: usersTasks.tasks });
        }
    } catch (error: any) {
        console.error('Error creating task', error);
        return createErrorResponse("Task not created - outside catch", 500);
    }
}