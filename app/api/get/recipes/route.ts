import connectDB from "@/lib/mongodb";
import { IUser } from "@/models/types/user";
import MongoUser from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { User } from "next-auth";
import { IRecipe } from "@/models/types/recipe";
import Recipe from "@/models/recipes";

export async function GET(req: NextRequest) {
  
  const secret = process.env.NEXTAUTH_SECRET || '';

  if (!secret) {
    return NextResponse.json({ status: 401, message: 'Incorrect secret', recipes: [] as IRecipe[] });
  }

  const session = await getServerSession({ req, secret });
  const token = await getToken({ req, secret });

  if (!session || !token) {
    return NextResponse.json({ status: 401, message: 'Unauthorized', recipes: [] as IRecipe[] });
  }

  try {

    await connectDB();

    const userSesh = session?.user as User;
    const email = userSesh?.email || '';

    if (!email) {
      return NextResponse.json({ status: 401, message: 'Unauthorized', recipes: [] as IRecipe[] });
    }

    const user = await MongoUser.findOne({ email }) as IUser;

    if (!user) {
      return NextResponse.json({ status: 401, message: `User doesn't exist`, recipes: [] as IRecipe[] });
    }

    const recs = await Recipe.find({ user: email });

    if (recs === null || recs === undefined) {

      return NextResponse.json({ status: 400, message: `Recipes don't exist`, recipes: [] as IRecipe[] });

    } else if (recs.length === 0) {

      return NextResponse.json({ status: 404, message: `Recipes empty`, recipes: [] as IRecipe[] });

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

      const response = NextResponse.json({ status: 200, message: `Success`, recipes: recipes as IRecipe[] });
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    }
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ status: 500, message: `Err catch: ${error}`, recipes: [] as IRecipe[] });
  }
}