import connectDB from "@/lib/mongodb";
import { IUser } from "@/models/types/user";
import MongoUser from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { User } from "next-auth";
import TasksByUser from "@/models/tasks/tasksByUser";
import { ITask } from "@/models/old/types/task";

export async function GET(req: NextRequest) {

  const secret = process.env.NEXTAUTH_SECRET || '';

  if (!secret) {
    return NextResponse.json({ status: 401, message: 'Incorrect secret', tasks: [] as ITask[] });
  }

  const session = await getServerSession({ req, secret });
  const token = await getToken({ req, secret });

  if (!session || !token) {
    return NextResponse.json({ status: 401, message: 'Unauthorized', tasks: [] as ITask[] });
  }

  try {

    await connectDB();

    const userSesh = session?.user as User;
    const email = userSesh?.email || '';

    if (!email) {
      return NextResponse.json({ status: 401, message: 'Unauthorized', tasks: [] as ITask[] });
    }

    const user = await MongoUser.findOne({ email }) as IUser;

    if (!user) {
      return NextResponse.json({ status: 401, message: `User doesn't exist`, tasks: [] as ITask[] });
    }

    const ts = await TasksByUser.find({ user_email: email });

    if (ts === null || ts === undefined) {

      return NextResponse.json({ status: 400, tasks: [] as ITask[] });

    } else if (ts.length === 0) {

      return NextResponse.json({ status: 404, tasks: [] as ITask[] });

    } else {

      const tasks = ts?.map((usersTasks: ITask) => {
        return {
          _id: usersTasks._id,
          user_email: usersTasks.user_email,
          title: usersTasks.title,
          description: usersTasks.description,
          time: usersTasks.time,
          date: usersTasks.date,
          completed: usersTasks.completed
        }
      }) as ITask[];

      const response = NextResponse.json({ status: 200, message: 'Success', tasks: tasks as ITask[] });
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    }

  } catch (error: any) {
    return NextResponse.json({ status: 500, message: `Error ${error}`, tasks: [] as ITask[] });
  }
}