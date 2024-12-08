import connectDB from "@/lib/mongodb";
import { createErrorResponse } from "@/lib/utils";
import Subscriber from "@/models/subscribers";
import { ISubscriber } from "@/models/types/subscriber";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
    try {
      
      await connectDB();
  
      const Subs = await Subscriber.find({});
  
      if (Subs.length === 0) {
        return NextResponse.json({status: 404, message: "No subscribers found"});
      }
  
      const subs =  Subs?.map((sub: ISubscriber) => {
          return {
            email: sub.email,
            name: sub.name,
            subscribed: sub.subscribed
          }});

      const response = NextResponse.json({subs, status: 200});
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;

    } catch (error: any) {
      return createErrorResponse(error.message, 500);
    }
  }