import connectDB from "@/lib/mongodb";
import { IUser } from "@/models/types/user";
import MongoUser from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { User } from "next-auth";
import Subscriber from "@/models/subscribers";
import { ISubscriber } from "@/models/types/subscriber";

export async function GET(req: NextRequest) {

  const secret = process.env.NEXTAUTH_SECRET || '';

  if (!secret) {
    return NextResponse.json({ status: 401, message: 'Incorrect secret', subs: [] as ISubscriber[] });
  }

  const session = await getServerSession({ req, secret });
  const token = await getToken({ req, secret });

  if (!session || !token) {
    return NextResponse.json({ status: 401, message: 'Unauthorized', subs: [] as ISubscriber[] });
  }

  try {

    await connectDB();

    const userSesh = session?.user as User;
    const email = userSesh?.email || '';

    if (!email) {
      return NextResponse.json({ status: 401, message: 'Unauthorized', subs: [] as ISubscriber[] });
    }

    const user = await MongoUser.findOne({ email }) as IUser;

    if (!user) {
      return NextResponse.json({ status: 401, message: `User doesn't exist`, subs: [] as ISubscriber[] });
    }

    const Subs = await Subscriber.find({});

    if (Subs.length === 0) {
      return NextResponse.json({ status: 404, message: "No subscribers found", subs: [] as ISubscriber[] });
    }

    const subs = Subs?.map((sub: ISubscriber) => {
      return {
        email: sub.email,
        name: sub.name,
        subscribed: sub.subscribed
      }
    }) as ISubscriber[];

    const response = NextResponse.json({ status: 200, message: 'Success', subs: subs as ISubscriber[] });
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;

  } catch (error: any) {
    return NextResponse.json({ status: 404, message: `Error ${error}`, subs: [] as ISubscriber[] });
  }
}