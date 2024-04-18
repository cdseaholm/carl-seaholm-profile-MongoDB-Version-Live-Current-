import connectDB from "@/lib/mongodb";
import { createErrorResponse } from "@/lib/utils";
import subscribers from "@/models/subscribers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
      await connectDB();
  
      const Subs = await subscribers.find();
  
      if (Subs.length === 0) {
        return new NextResponse(JSON.stringify({status: 404, message: 'No subscribers found'}));
      }
  
      let json_response = {
        Subs: Subs?.map((sub) => {
          return {
            id: sub._id,
            email: sub.email,
            name: sub.name,
            subscribed: sub.subscribed,
            subscribedAt: sub.subscribedAt,
          }}),
      };
      return NextResponse.json(json_response);
    } catch (error: any) {
      return createErrorResponse(error.message, 500);
    }
  }