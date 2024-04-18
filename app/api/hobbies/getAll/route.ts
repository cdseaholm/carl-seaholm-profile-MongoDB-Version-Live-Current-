
import connectdb from '@/lib/mongodb';
import { createErrorResponse } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import HobbyModel from '@/models/hobby';

async function getHobbies() {
  try {
    await connectdb();

    const hobbies = await HobbyModel.find();

    if (hobbies.length === 0) {
      return new NextResponse(JSON.stringify({status: 404, message: 'No hobbies found'}));
    }

    return hobbies;

  } catch (error: any) {
    return createErrorResponse(error.message, 500);
  }
}

export async function GET(request: NextRequest) {
  const hobs = await getHobbies();
  return NextResponse.json({ hobs });
}
