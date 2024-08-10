import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req: NextRequest): Promise<NextResponse> {
    try {
        let userID = req.url.split('/')[4];
        console.log('checkUserID', userID);
        await connectDB();

        if (!userID) {
            return NextResponse.json({ status: 400, message: 'Invalid user' });
        }

        const user = await User.findOneAndDelete({
            email: userID
        });

        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found' });
        }

        return NextResponse.json({ status: 200, message: 'User deleted' });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: error.message });
    }

}