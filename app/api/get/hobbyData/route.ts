import connectDB from "@/lib/mongodb";
import { IUser } from "@/models/types/user";
import MongoUser from "@/models/user";
import { NextResponse } from "next/server";
import { IHobbyData } from "@/models/types/hobbyData";
import HobbyData from "@/models/hobbyData";

export async function GET() {

  const userEmail = 'cdseaholm@gmail.com';

  try {

    await connectDB();

    const user = await MongoUser.findOne({ email: userEmail }) as IUser;

    if (!user) {
      return NextResponse.json({ status: 404, message: 'User not found', hobbyData: [] as IHobbyData[] });
    }

    const hobbyData = await HobbyData.find({ userId: user._id?.toString() });

    if (hobbyData === null || hobbyData === undefined) {

      return NextResponse.json({ status: 402, message: 'Monthly Activity not found', hobbyData: [] as IHobbyData[] });

    } else if (hobbyData.length === 0) {

      return NextResponse.json({ status: 404, message: 'Monthly Activity empty', hobbyData: [] as IHobbyData[] });

    } else {
      const hobbiesData = hobbyData.map((data: IHobbyData) => {
        return {
          userId: data.userId,
          title: data.title,
          description: data.description,
          timeFrequency: data.timeFrequency,
          category: data.category,
          color: data.color,
          isActive: data.isActive,
          goals: data.goals,
          _id: data._id,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        };
      });

      const response = NextResponse.json({ status: 200, message: 'Success', hobbyData: hobbiesData as IHobbyData[] });
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    }
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ status: 500, message: `Err catch ${error}`, hobbyData: [] as IHobbyData[] });
  }

}