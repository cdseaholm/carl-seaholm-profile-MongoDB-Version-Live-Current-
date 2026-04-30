import connectDB from "@/lib/mongodb";
import { IUser } from "@/models/types/user";
import MongoUser from "@/models/user";
import { NextResponse } from "next/server";
import MonthlyActivity from "@/models/monthData";
import { IMonthlyData } from "@/models/types/monthlyData";

export async function GET() {

  const userEmail = 'cdseaholm@gmail.com';

  try {

    await connectDB();

    const user = await MongoUser.findOne({ email: userEmail }) as IUser;

    if (!user) {
      return NextResponse.json({ status: 404, message: 'User not found', monthlyInfo: [] as IMonthlyData[] });
    }

    const monthlyActivity = await MonthlyActivity.find({ userEmail: userEmail });

    if (monthlyActivity === null || monthlyActivity === undefined) {

      return NextResponse.json({ status: 402, message: 'Monthly Activity not found', monthlyInfo: [] as IMonthlyData[] });

    } else if (monthlyActivity.length === 0) {

      return NextResponse.json({ status: 404, message: 'Monthly Activity empty', monthlyInfo: [] as IMonthlyData[] });

    } else {
      const monthlyInfo = monthlyActivity.map((monthData: IMonthlyData) => {
        return {
          userEmail: monthData.userEmail,
          month: monthData.month,
          monthColorInfo: monthData.monthColorInfo,
          _id: monthData._id,
          createdAt: monthData.createdAt,
          updatedAt: monthData.updatedAt
        };
      });

      const response = NextResponse.json({ status: 200, message: 'Success', monthlyInfo: monthlyInfo as IMonthlyData[] });
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    }
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ status: 500, message: `Err catch ${error}`, monthlyInfo: [] as IMonthlyData[] });
  }

}