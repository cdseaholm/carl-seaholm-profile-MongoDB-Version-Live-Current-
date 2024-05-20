import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { createErrorResponse } from '@/lib/utils';
import Recipe from '@/models/recipes';
import { IRecipe } from '@/models/types/recipe';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const adminID = req.url.split('/')[4];
  console.log(adminID);
 
  try {

    await connectDB();

    const recs = await Recipe.find({user: adminID});
    
    if (recs === null || recs === undefined) {

      return createErrorResponse("Null or Undefined", 400);

    } else if (recs.length === 0) {

      return NextResponse.json({status: 404, message: "No recipes found"});

    } else {
      const recipes = recs.map((hobby: IRecipe) => {
        const newDate = new Date(hobby.date).toLocaleDateString();
        return {
            name: hobby.name,
            date: newDate,
            rating: hobby.rating,
            notes: hobby.notes,
            user: hobby.user,
            image: hobby.image,
            link: hobby.link
        }
      });

      const response = NextResponse.json({recipes, status: 200});
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    }
  } catch (error: any) {
    console.log(error.message);
    return createErrorResponse(error.message, 500);
  }

}