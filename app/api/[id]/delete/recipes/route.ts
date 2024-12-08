import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const userID = req.url.split('/')[4];
    console.log(userID);

    try {
        await connectDB();

        const user = await User.findOne({ email: userID });

        if (!user) {
            return NextResponse.json({ status: 401 })
        }

        const recipesIndex = user.userObjects.findIndex((object) => object.title === 'recipes');

        if (recipesIndex === -1) {
            return NextResponse.json({ status: 403 });
        }

        const result = await User.updateOne(
            { email: userID },
            { $pull: { userObjects: { title: 'recipes' } }}
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ status: 500 })
        }
        return NextResponse.json({status: 200})

    } catch (error) {
        return NextResponse.json({status: 500})
    }
}
