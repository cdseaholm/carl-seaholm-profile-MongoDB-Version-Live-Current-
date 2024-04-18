
import connectdb from '@/lib/mongodb';
import { createErrorResponse } from '@/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import HobbyModel from '@/models/hobby';
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

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  await runMiddleware(request, response, corsGet);
  const hobs = await getHobbies();
  return response.json({ hobs });
}
