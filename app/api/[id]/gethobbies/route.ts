import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Hobby from '@/models/hobby';
import { IHobby } from '@/models/types/hobby';
import { createErrorResponse } from '@/lib/utils';
import { useStateContext } from '@/app/context/state/StateContext';

export async function GET(req: NextRequest): Promise<NextResponse> {

  var adminID = req.url.split('/')[4];
 
  try {

    await connectDB();

    const hobs = await Hobby.find({user_email: adminID});
    
    if (hobs === null || hobs === undefined) {

      return createErrorResponse("Null or Undefined", 400);

    } else if (hobs.length === 0) {

      return NextResponse.json({status: 404, message: "No hobbies found"});

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
      });

      const response = NextResponse.json({hobbies, status: 200});
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    }
  } catch (error: any) {
    console.log(error.message);
    return createErrorResponse(error.message, 500);
  }

}