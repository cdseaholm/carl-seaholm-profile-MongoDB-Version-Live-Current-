
import connectDB from "@/lib/mongodb";
import { createErrorResponse } from "@/lib/utils";
import TasksByUser from "@/models/tasks/tasksByUser";
import { ITaskByDate, ITasksByUser } from "@/models/types/task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {

  var adminID = req.url.split('/')[4];

  try {
    
    await connectDB();
  
    const ts = await TasksByUser.find({user_email: adminID});

    console.log('Tasks1', JSON.stringify(ts, null, 2));

    if (ts === null || ts === undefined) {

      return createErrorResponse("Null or Undefined", 400);

    } else if (ts.length === 0) {

      return NextResponse.json({status: 404, message: "No tasks found"});

    } else {

    const tasks =  ts?.map((tasks: ITasksByUser) => {
        return {
          _id: tasks._id,
          tasksByDate: tasks.tasksByDate as ITaskByDate[],
          user_email: tasks.user_email
        }
    });
    console.log('Tasks2', JSON.stringify(tasks, null, 2));

    const response = NextResponse.json({tasks, status: 200});
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }

  } catch (error: any) {
    return createErrorResponse(error.message, 500);
  }
}