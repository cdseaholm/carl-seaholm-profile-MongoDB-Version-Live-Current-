
import hobby from '@/models/hobby';
import connectdb from '@/lib/mongodb';
import { createErrorResponse } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import HobbyModel from '@/models/hobby';

export async function GET(request: NextRequest) {
  try {
    await connectdb();

    const hobbys = await HobbyModel.find();

    if (hobbys.length === 0) {
      return new NextResponse(JSON.stringify({status: 404, message: 'No hobbies found'}));
    }

    const hobbies = hobbys?.map((hobby) => {
      return {
        id: hobby._id,
        title: hobby.title,
        dates: hobby.dates,
        descriptions: hobby.descriptions,
        minutesXsessions: hobby.minutesXsessions,
        categories: hobby.categories,
        goals: hobby.goals,
        user_email: hobby.user_email,
        color: hobby.color,
      }});

    return new NextResponse(JSON.stringify({status: 200, hobbies}));

  
  } catch (error: any) {
    return createErrorResponse(error.message, 500);
  }
}
