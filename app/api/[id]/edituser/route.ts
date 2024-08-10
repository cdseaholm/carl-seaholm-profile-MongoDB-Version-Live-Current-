import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest): Promise<NextResponse> {
    const email = 'cdseaholm@gmail.com'
    //remember to add in email to fetch
    try {
        const body = await req.json();
        const tasks = body.tasks;
        const hobbies = body.hobbies;
        const recipes = body.recipes;
        await connectDB();
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ status: 404, message: "User not found" });
        }
        user.customFields = {
            hobbies,
            tasks,
            recipes
        };

        user.markModified('customFields');
        await user.save();
        
        return NextResponse.json({ status: 200, message: 'Updated' });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: error.message });
    }
}