import connectDB from "@/lib/mongodb";
import { IUser } from "@/models/types/user";
import MongoUser from "@/models/user";
import { NextResponse } from "next/server";
import { ISession } from "@/models/types/session";
import Session from "@/models/session";

export async function GET() {

  const userEmail = 'cdseaholm@gmail.com';

  try {

    await connectDB();

    const user = await MongoUser.findOne({ email: userEmail }) as IUser;

    if (!user) {
      return NextResponse.json({ status: 404, message: 'User not found', sessionInfo: [] as ISession[] });
    }

    const sessions = await Session.find({ userId: user._id });

    if (sessions === null || sessions === undefined) {

      return NextResponse.json({ status: 402, message: 'Monthly Activity not found', sessionInfo: [] as ISession[] });

    } else if (sessions.length === 0) {

      return NextResponse.json({ status: 404, message: 'Monthly Activity empty', sessionInfo: [] as ISession[] });

    } else {
      const sessionInfo = sessions.map((sessionData: ISession) => {
        return {
          userId: sessionData.userId,
          month: sessionData.month,
          year: sessionData.year,
          hobbyTitle: sessionData.hobbyTitle,
          date: sessionData.date,
          minutes: sessionData.minutes,
          _id: sessionData._id,
          createdAt: sessionData.createdAt,
          updatedAt: sessionData.updatedAt
        };
      });

      const response = NextResponse.json({ status: 200, message: 'Success', sessionInfo: sessionInfo as ISession[] });
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    }
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ status: 500, message: `Err catch ${error}`, sessionInfo: [] as ISession[] });
  }

}