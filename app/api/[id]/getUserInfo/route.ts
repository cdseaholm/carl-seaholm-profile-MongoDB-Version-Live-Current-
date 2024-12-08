import connectDB from "@/lib/mongodb";
import { IUser } from "@/models/types/user";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const adminID = req.url.split('/')[4];
  console.log(adminID)
  if (!adminID) {
    return NextResponse.json({ status: 400, message: 'Missing adminID' });
  }

  try {
    await connectDB();

    const user = await User.find({ email: adminID }) as IUser[];

    if (!user || user.length === 0) {
      return NextResponse.json({ status: 404, userInfo: {} as IUser });
    }

    const userInfo = user.map((info: IUser) => ({
      _id: info._id,
      name: info.name,
      email: info.email,
      blogsub: info.blogsub,
      userObjects: info.userObjects,
      entries: info.entries,
      fieldObjects: info.fieldObjects,
      createdAt: info.createdAt,
      updatedAt: info.updatedAt,
    })) as IUser[];

    const response = NextResponse.json({ status: 200, userInfo: userInfo[0] });
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ status: 500, message: 'Internal Server Error' });
  }
}