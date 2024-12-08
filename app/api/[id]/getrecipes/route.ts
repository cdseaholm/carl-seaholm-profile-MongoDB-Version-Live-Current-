import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Recipe from '@/models/recipes';
import { IRecipe } from '@/models/types/recipe';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const adminID = req.url.split('/')[4];
  console.log(adminID);
 
  try {

    await connectDB();

    const recs = await Recipe.find({user: adminID});
    
    if (recs === null || recs === undefined) {

      return NextResponse.json({status: 400, recipes: [] as IRecipe[]});

    } else if (recs.length === 0) {

      return NextResponse.json({status: 404, recipes: [] as IRecipe[]});

    } else {
      const recipes = recs.map((hobby: IRecipe) => {
        return {
            name: hobby.name,
            date: hobby.date,
            rating: hobby.rating,
            notes: hobby.notes,
            user: hobby.user,
            image: hobby.image,
            link: hobby.link,
            _id: hobby._id,
            createdAt: hobby.createdAt,
            updatedAt: hobby.updatedAt
        }
      }) as IRecipe[];

      const response = NextResponse.json({status: 200, recipes: recipes as IRecipe[]});
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    }
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({status: 500, recipes: [] as IRecipe[]});
  }
}