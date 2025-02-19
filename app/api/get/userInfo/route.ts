import connectDB from "@/lib/mongodb";
import { IUser } from "@/models/types/user";
import { NextResponse } from "next/server";
import MongoUser from "@/models/user";

export async function GET() {

  const userEmail = 'cdseaholm@gmail.com';

  try {

    await connectDB();

    const user = await MongoUser.findOne({ email: userEmail }) as IUser;

    if (!user) {
      return NextResponse.json({ status: 401, message: `User doesn't exist`, userInfo: {} as IUser });
    }

    const response = NextResponse.json({ status: 200, userInfo: user });
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;

  } catch (error: any) {
    console.error("Error fetching user data from database:", error);
    return NextResponse.json({ status: 500, userInfo: {} as IUser });
  }
}