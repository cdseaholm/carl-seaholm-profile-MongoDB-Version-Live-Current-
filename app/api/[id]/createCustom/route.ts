import connectDB from "@/lib/mongodb";
import CustomField from "@/models/customField";
import { ICustomField } from "@/models/types/customField";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

const checkObjectName = (objectName: string) => {
    const lowerName = objectName.toLowerCase();
    const isValid = /^[a-z]+$/.test(lowerName);
    return isValid ? lowerName : '';
}

export async function POST(req: NextRequest) {

    var userID = req.url.split('/')[4];

    try {
        console.log('Connecting to DB...');
        await connectDB();
        console.log('Connected to DB');

        const data = await req.json();
        
        const fieldTitle = data.fieldTitle as string;
        const value = data.value as any;
        const type = data.type as string;
        const objectName = data.objectName as string;
        if (!fieldTitle || !value || !type || !objectName) {
            return NextResponse.json({ status: 400, message: 'Invalid custom field' });
        }
        if (!objectName) {
            return NextResponse.json({ status: 400, message: 'Invalid object name' });
        }

        console.log('Finding user...');
        const user = await User.findOne({ email: userID });
        console.log('User found');

        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found' });
        }
        
        const checkedName = checkObjectName(objectName) as string;
        if (!checkedName) {
            return NextResponse.json({ status: 400, message: 'Invalid object name' });
        }
        
        const newCustomField = new CustomField({
            title: checkedName,
            fieldTitles: [fieldTitle],
            values: [value],
            typesOfValues: [type],
        }).toObject();

        if (user.customFields.length > 0 && user.customFields) {
            const existingFieldIndex = user.customFields.findIndex((field) => field.title === checkedName) as number;
            if (existingFieldIndex !== -1 && user.customFields[existingFieldIndex]) {
                const existingFieldToUser = user.customFields[existingFieldIndex] as ICustomField;
                const newFieldTitles = [...existingFieldToUser.fieldTitles, fieldTitle] as string[];
                const newValues = [...existingFieldToUser.values, value] as any[];
                const newTypesOfValues = [...existingFieldToUser.typesOfValues, type] as string[];
                const updatedField = {
                    title: checkedName,
                    fieldTitles: newFieldTitles,
                    values: newValues,
                    typesOfValues: newTypesOfValues
                } as ICustomField;
                user.customFields[existingFieldIndex] = updatedField;
            }
        } else {
            const otherFields = user.customFields as ICustomField[];
            const newCustomFields = [...otherFields, newCustomField] as ICustomField[];
            user.customFields = newCustomFields;
        }
        
        await user.save();

        //the app scales(if it does), this might need to be updated to a denormalized schema

        return NextResponse.json({ status: 200, message: 'Custom field created' });
    } catch (error: any) {
        console.error('Error creating custom field', error);
        return NextResponse.json({ status: 500, message: 'Error creating custom field' });
    }
}