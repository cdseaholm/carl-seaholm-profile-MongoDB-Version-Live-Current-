import connectDB from "@/lib/mongodb";
import { IUser } from "@/models/types/user";
import User from "@/models/user";
import * as argon2id from "argon2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {

  var adminID = req.url.split('/')[4];

  try {

    await connectDB();
    const password = await req.json();

    const user = await User.find({ email: adminID }) as IUser[];

    if (user === null || user === undefined) {

      return NextResponse.json({ status: 400, userInfo: {} as IUser });

    } else if (user.length === 0) {

      return NextResponse.json({ status: 404, userInfo: {} as IUser });

    } else {
      
      const passwordToCheck = user[0] ? user[0].password : '' as string;

      const validPassword = await argon2id.verify(passwordToCheck, password);

      if (!validPassword) {
        return NextResponse.json({ status: 401, userInfo: {} as IUser });
      }

      const userInfo = user?.map((info: IUser) => {
        return {
          _id: info._id,
          name: info.name,
          email: info.email,
          blogsub: info.blogsub,
          userObjects: info.userObjects,
          createdAt: info.createdAt,
          updatedAt: info.updatedAt,
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