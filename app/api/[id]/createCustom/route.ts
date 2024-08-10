import connectDB from "@/lib/mongodb";
import { CustomField } from "@/models/types/customField";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    var userID = req.url.split('/')[4];

    try {
        await connectDB();
        const data = await req.json();
        const customField = data.customField as CustomField;
        if (!customField) {
            return NextResponse.json({ status: 400, message: 'Invalid custom field' });
        }
        const fieldType = customField?.fieldTitle;
        if (!fieldType) {
            return NextResponse.json({ status: 400, message: 'Invalid field type' });
        }

        const customFieldToAdd = await User.findOneAndUpdate({
            email: userID
        }, {
            $push: {
                customFields: customField
            }
        }, {
            new: true
        }) as CustomField;
        //be aware that as the app scales (if it does), this might need to be updated to a denormalized schema
        if (!customFieldToAdd) {
            return NextResponse.json({ status: 404, message: 'Custom field not created' });
        }
        return NextResponse.json({ status: 200, message: 'Custom field created' });
    } catch (error: any) {
        console.error('Error creating custom field', error);
        return NextResponse.json({ status: 500, message: 'Error creating custom field' });
    }
}