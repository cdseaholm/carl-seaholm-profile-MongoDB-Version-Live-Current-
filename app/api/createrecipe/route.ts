
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/utils";
import Recipe from "@/models/recipes";


export async function POST(request: Request) {

    try {
        await connectDB();
        const data = await request.json();
        if (!data.name) {
            return createErrorResponse("Invalid name", 400);
        }
        if (!data.user) {
            return createErrorResponse("User must be signed in", 400);
        }

        const recipeToAdd = await Recipe.create({
            name: data.name,
            date: data.date,
            rating: data.rating,
            notes: data.notes,
            user: data.user,
            image: data.image,
            link: data.link
        });
        recipeToAdd.save();
        if (!recipeToAdd) {
            return createErrorResponse("Recipe not created", 404);
        }
        return NextResponse.json({ status: 200, recipe: recipeToAdd });
    } catch (error: any) {
        console.error('Error creating Recipe', error);
        return createErrorResponse("Recipe not created - outside catch", 500);
    }
}