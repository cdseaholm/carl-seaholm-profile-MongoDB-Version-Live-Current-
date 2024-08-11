import connectDB from "@/lib/mongodb";
import { ICustomField } from "@/models/types/customField";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest): Promise<NextResponse> {
    const userID = req.url.split('/')[4];

    try {
        const body = await req.json();
        const tasks = body.tasks;
        const hobbies = body.hobbies;
        const recipes = body.recipes;
        await connectDB();
        const user = await User.findOneAndUpdate({
            email: userID
        }, {
            $push: {
                customFields: {
                    $each: [
                        { tasks: tasks },
                        { hobbies: hobbies },
                        { recipes: recipes }
                    ]
                }
            }
        }, {
            new: true
        }) as ICustomField;
        
        if (!user) {
            return NextResponse.json({ status: 404, message: "User not found" });
        }
        
        return NextResponse.json({ status: 200, message: 'Updated' });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: error.message });
    }
}