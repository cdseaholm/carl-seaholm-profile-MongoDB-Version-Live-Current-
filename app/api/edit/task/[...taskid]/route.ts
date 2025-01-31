
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/tasks/tasksByUser";
import { IUser } from "@/models/types/user";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import email from "next-auth/providers/email";
import MongoUser from "@/models/user";
import { ObjectId } from "mongodb";


export async function PUT(req: NextRequest) {
    const secret = process.env.NEXTAUTH_SECRET ? process.env.NEXTAUTH_SECRET : '';

    if (secret === '') {
        return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }

    const session = await getServerSession({ req, secret })
    const token = await getToken({ req, secret });

    if (!session || !token) {
        return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }


    const taskID = req.url.split('/')[6];

    if (!taskID || taskID === '') {
        return NextResponse.json({ status: 403, message: 'Needs a taskID' });
    }

    try {
        const body = await req.json();
        await connectDB();

        const user = await MongoUser.findOne({ email: email }) as IUser;

        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found' });
        }

        const objectID = new ObjectId(taskID);

        const taskInitial = await Task.findById(objectID);

        if (!taskInitial) {
            return NextResponse.json({ status: 404, message: 'Task not found' });
        }

        const taskToEdit = await Task.updateOne(
            { _id: objectID },
            {
                title: taskInitial.title,
                date: taskInitial.date,
                time: taskInitial.time,
                description: taskInitial.description,
                user_email: taskInitial.user_email,
                completed: body.completed,
                updatedAt: new Date()
            }
        );

        if (!taskToEdit) {
            return NextResponse.json({ status: 404, message: "Task not edited - Mongo" });
        }

        return NextResponse.json({ status: 200, message: "Success!" });

    } catch (error: any) {

        console.error('Error editing task', error);
        return NextResponse.json({ status: 500, message: "Task not edited - outside catch" });

    }

}