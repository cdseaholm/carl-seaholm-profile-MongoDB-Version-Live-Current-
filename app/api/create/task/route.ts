import connectDB from "@/lib/mongodb";
import MongoUser from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "@/models/types/user";
import { getServerSession, User } from "next-auth";
import { getToken } from "next-auth/jwt";
import TasksByUser from "@/models/tasks/tasksByUser";
import { ITask } from "@/models/types/task";

export async function POST(req: NextRequest) {

    const secret = process.env.NEXTAUTH_SECRET ? process.env.NEXTAUTH_SECRET : '';

    if (secret === '') {
        return NextResponse.json({ status: 401, message: 'Unauthorized', task: [] as ITask[] });
    }

    const session = await getServerSession({ req, secret })
    const token = await getToken({ req, secret });

    if (!session || !token) {
        return NextResponse.json({ status: 401, message: 'Unauthorized', task: [] as ITask[] });
    }

    try {
        const body = await req.json();
        await connectDB();
        const userSesh = session?.user as User;
        const email = userSesh ? userSesh.email : '';

        if (email === '') {
            return NextResponse.json({ status: 401, message: 'Unauthorized', task: [] as ITask[] });
        }

        const user = await MongoUser.findOne({ email: email }) as IUser;

        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found', task: [] as ITask[] });
        }
        
        const usersTasks = await TasksByUser.findOne({ user_email: body.user_email }) as any;
        if (!usersTasks) {
            const taskToAdd = await TasksByUser.create({
                tasks: [{
                    title: body.title,
                    time: body.time,
                    description: body.description,
                    completed: body.completed,
                    user_email: body.user_email,
                    date: body.date,
                }] as any,
                user_email: body.user_email
            }) as any;
            await taskToAdd.save();
            return NextResponse.json({ status: 200, message: 'Success', task: usersTasks.tasks as ITask[] });
        } else {
            usersTasks.tasks.push({
                title: body.title,
                time: body.time,
                description: body.description,
                completed: body.completed,
                user_email: body.user_email,
                date: body.date
            }) as ITask[];
            await usersTasks.save();
            return NextResponse.json({ status: 200, message: 'Success', task: usersTasks.tasks as ITask[] });
        }
    } catch (error: any) {
        console.error('Error creating task', error);
        return NextResponse.json({ status: 500, message: 'Task not created - outside catch', task: [] as ITask[] });
    }
}