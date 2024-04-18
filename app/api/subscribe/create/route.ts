
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import SubscriberModel from "@/models/subscribers";


export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();
    if (!body.subEmail) {
        return NextResponse.json({status: 400, error: 'Email are required' });
    }
    const alreadySubbed = await SubscriberModel.findOne({ email: body.subemail });
    if (alreadySubbed) {
        return NextResponse.json({status: 401, error: 'You are already subscribed' });
    }
    const newSub = await new SubscriberModel({
        email: body.subEmail,
        name: body.subName,
        subscribed: true,
        subscribedAt: new Date(),
    })
    const subSave = await newSub.save();
    if (!subSave) {
        return NextResponse.json({status: 500, error: 'Error saving subscriber' });
    }
    return NextResponse.json({status: 200, message: 'Subscriber added successfully' });
}