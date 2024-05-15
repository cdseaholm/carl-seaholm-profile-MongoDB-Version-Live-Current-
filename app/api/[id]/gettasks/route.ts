
import connectDB from "@/lib/mongodb";
import { createErrorResponse } from "@/lib/utils";
import Task from "@/models/task";
import { ITask } from "@/models/types/task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {

    var adminID = req.url.split('/')[4];

    try {
      
      await connectDB();
    
      const ts = await Task.find({user_email: adminID});

      if (ts === null || ts === undefined) {

        return createErrorResponse("Null or Undefined", 400);
  
      }else if (ts.length === 0) {
        return NextResponse.json({status: 404, message: "No tasks found"});
      }

      const tasks =  ts?.map((task: ITask) => {
          return {
            title: task.title,
            date: task.date,
            time: task.time,
            description: task.description,
            user_email: task.user_email,
            _id: task._id,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
            completed: task.completed
          }});

      const response = NextResponse.json({tasks, status: 200});
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;

    } catch (error: any) {
      return createErrorResponse(error.message, 500);
    }
  }