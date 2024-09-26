import connectDB from "@/lib/mongodb";
import TasksByUser from "@/models/tasks/tasksByUser";
import { ITask } from "@/models/types/task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {

  var adminID = req.url.split('/')[4];

  try {
    
    await connectDB();
  
    const ts = await TasksByUser.find({user_email: adminID});

    if (ts === null || ts === undefined) {

      return NextResponse.json({status: 400, tasks: [] as ITask[]});

    } else if (ts.length === 0) {

      return NextResponse.json({status: 404, tasks: [] as ITask[]});

    } else {

    const tasks =  ts?.map((usersTasks: ITask) => {
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

    const response = NextResponse.json({status: 200, tasks: tasks as ITask[]});
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }

  } catch (error: any) {
    return NextResponse.json({status: 500, tasks: [] as ITask[]});
  }
}