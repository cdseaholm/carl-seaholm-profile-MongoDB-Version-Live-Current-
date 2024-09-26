
import connectDB from "@/lib/mongodb";
import { createErrorResponse } from "@/lib/utils";
import Subscriber from "@/models/subscribers";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        await connectDB();
        if (!body.modalSubEmail) {
            return createErrorResponse("Email is required", 401);
        }
        const alreadySubbed = await Subscriber.findOne({email: body.modalSubEmail});

        if (alreadySubbed) {
            return createErrorResponse("Subscriber already exists", 402);
        }
        const newSub = await Subscriber.create({
            email: body.modalSubEmail,
            name: body.modalSubName,
            subscribed: true
        });

        newSub.save();
        
        if (!newSub) {
            return createErrorResponse("Subscriber not created - Second Catch", 500);
        }
    } catch (error: any) {
        return createErrorResponse('Subscriber not created - Top Catch', 500);
    }

    return NextResponse.json({status: 200, message: 'Subscriber added successfully' });
}