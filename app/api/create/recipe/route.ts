import connectDB from "@/lib/mongodb";
import MongoUser from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "@/models/types/user";
import { getServerSession, User } from "next-auth";
import { getToken } from "next-auth/jwt";
import Recipe from "@/models/recipes";

export async function POST(req: NextRequest) {

    const secret = process.env.NEXTAUTH_SECRET ? process.env.NEXTAUTH_SECRET : '';

    if (secret === '') {
        return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }

    const session = await getServerSession({ req, secret })
    const token = await getToken({ req, secret });

    if (!session || !token) {
        return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }

    try {
        const body = await req.json();
        await connectDB();
        const userSesh = session?.user as User;
        const email = userSesh ? userSesh.email : '';

        if (email === '') {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const user = await MongoUser.findOne({ email: email }) as IUser;

        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found' });
        }

        const recipeToAdd = await Recipe.create({
            name: body.name,
            date: body.date,
            rating: body.rating,
            notes: body.notes,
            user: body.user,
            image: body.image,
            link: body.link
        });
        recipeToAdd.save();
        if (!recipeToAdd) {
            return NextResponse.json({ status: 404, message: "Recipe not created" });
        }
        return NextResponse.json({ status: 200, recipe: recipeToAdd });
    } catch (error: any) {
        console.error('Error creating Recipe', error);
        return NextResponse.json({ status: 500, message: "Recipe not created - outside catch" });
    }
}