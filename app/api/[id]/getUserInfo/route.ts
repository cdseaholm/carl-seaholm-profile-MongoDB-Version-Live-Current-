
import connectDB from "@/lib/mongodb";
import { IUser } from "@/models/types/user";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {

  var adminID = req.url.split('/')[4];

  try {

    await connectDB();

    const user = await User.find({ email: adminID }) as IUser[];

    if (user === null || user === undefined) {

      return NextResponse.json({ status: 400, userInfo: {} as IUser });

    } else if (user.length === 0) {

      return NextResponse.json({ status: 404, userInfo: {} as IUser });

    } else {

      const userInfo = user?.map((info: IUser) => {
        return {
          _id: info._id,
          email: info.email,
          customFields: info.customFields,
        }
      }) as IUser[];

      const response = NextResponse.json({ status: 200, userInfo: userInfo[0] as IUser });
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;

    }

  } catch (error: any) {
    return NextResponse.json({ status: 500, tasks: {} as IUser });
  }
}