import connectDB from "@/lib/mongodb";
import { IUser } from "@/models/types/user";
import MongoUser from "@/models/user";
import { NextResponse } from "next/server";
import { IHobby } from "@/models/types/hobby";
import Hobby from "@/models/old/hobby";

export async function GET() {

  const userEmail = 'cdseaholm@gmail.com';

  try {

    await connectDB();

    const user = await MongoUser.findOne({ email: userEmail }) as IUser;

    if (!user) {
      return NextResponse.json({ status: 404, message: 'User not found', hobbies: [] as IHobby[] });
    }

    const hobs = await Hobby.find({ user_email: userEmail });

    if (hobs === null || hobs === undefined) {

      return NextResponse.json({ status: 402, message: 'Hobbies not found', hobbies: [] as IHobby[] });

    } else if (hobs.length === 0) {

      return NextResponse.json({ status: 404, message: 'Hobbies empty', hobbies: [] as IHobby[] });

    } else {
      const hobbies = hobs.map((hobby: IHobby) => {
        return {
          title: hobby.title,
          categories: hobby.categories,
          dates: hobby.dates,
          _id: hobby._id.toString(),
          descriptions: hobby.descriptions,
          minutesXsessions: hobby.minutesXsessions,
          goals: hobby.goals,
          user_email: hobby.user_email,
          color: hobby.color,
          createdAt: hobby.createdAt,
          updatedAt: hobby.updatedAt
        }
      }) as IHobby[];

      const response = NextResponse.json({ status: 200, message: 'Success', hobbies: hobbies as IHobby[] });
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    }
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ status: 500, message: `Err catch ${error}`, hobbies: [] as IHobby[] });
  }

}