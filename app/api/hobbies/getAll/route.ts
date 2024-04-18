
import connectdb from '@/lib/mongodb';
import { createErrorResponse } from '@/lib/utils';
import HobbyModel from '@/models/hobby';
import { NextRequest, NextResponse } from 'next/server';
import corsGet, { runMiddleware } from '@/middleware/cors';

async function getHobbies() {
  try {
    await connectdb();

    const hobbies = await HobbyModel.find();

    if (hobbies.length === 0) {
      return createErrorResponse('No hobbies found', 404);
    }

    return hobbies;

  } catch (error: any) {
    return createErrorResponse(error.message, 500);
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  await runMiddleware(request, response, corsGet);
  const hobs = await getHobbies();
  return NextResponse.json({ hobs });
}
