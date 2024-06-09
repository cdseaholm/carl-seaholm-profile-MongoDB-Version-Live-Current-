
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Task from "@/models/tasks/tasksByUser";
import { createErrorResponse } from "@/lib/utils";
import Tasks from "@/models/tasks/tasksByUser";
import { ITaskByDate } from "@/models/types/task";


export async function POST(request: Request) {

    try {
        await connectDB();
        const data = await request.json();
        const usersTasks = await Tasks.findOne({ user_email: data.user_email });
        if (!usersTasks) {
            const taskToAdd = new Tasks({
                tasksByDate: [{
                    tasks: [{
                        title: data.title,
                        time: data.time,
                        description: data.description,
                        completed: data.completed,
                        user_email: data.user_email,
                        date: data.date
                    }],
                    date: data.date,
                    user_email: data.user_email
                }],
                user_email: data.user_email
            });
            await taskToAdd.save();
            return NextResponse.json({ status: 200, task: taskToAdd.tasksByDate });
        } else {
            const dateExists = usersTasks.tasksByDate.find((date: ITaskByDate) => date.date === data.date);
            if (!dateExists) {
                usersTasks.tasksByDate.push({
                    tasks: [{
                        title: data.title,
                        time: data.time,
                        description: data.description,
                        completed: data.completed,
                        user_email: data.user_email,
                        date: data.date
                    }],
                    date: data.date
                });
                return NextResponse.json({ status: 200, task: usersTasks.tasksByDate });
            } else {
                dateExists.tasks.push({
                    title: data.title,
                    time: data.time,
                    description: data.description,
                    completed: data.completed,
                    user_email: data.user_email,
                    date: data.date
                });
            }
            await usersTasks.save();
            return NextResponse.json({ status: 200, task: dateExists.tasks });
        }
    } catch (error: any) {
        console.error('Error creating task', error);
        return createErrorResponse("Task not created - outside catch", 500);
    }
}