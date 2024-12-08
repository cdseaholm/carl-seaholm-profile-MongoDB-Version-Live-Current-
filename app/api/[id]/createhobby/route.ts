import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import { IUser } from "@/models/types/user";
import { IUserObjectIndexed } from "@/models/types/userObjectIndexed";
import { IField, IFieldObject } from "@/models/types/field";

export async function POST(request: Request) {
    try {
        await connectDB();
        const data = await request.json();

        if (!data.title) {
            return NextResponse.json({ status: 400, message: "Invalid Title" });
        }

        if (!data.user_email) {
            return NextResponse.json({ status: 400, message: "User must be signed in" });
        }

        const user = await User.findOne({ email: data.user_email }) as IUser;
        if (!user) {
            return NextResponse.json({ status: 404, message: "User not found" });
        }

        let hobbies = user.userObjects[0];
        if (!hobbies) {
            return NextResponse.json({ status: 404, message: "Hobbies not found" });
        }

        const indexes = hobbies.indexes as IUserObjectIndexed[];
        if (!indexes) {
            return NextResponse.json({ status: 404, message: "Hobby Indexes not found" });
        }

        const newIndex = { title: data.title, index: data.fieldObjectIndex } as IUserObjectIndexed;
        if (!newIndex) {
            return NextResponse.json({ status: 400, message: 'Error indexing hobby' });
        }

        hobbies.indexes = [...indexes, newIndex] as IUserObjectIndexed[];

        let fieldObjects = user.fieldObjects as IFieldObject[];
        if (!fieldObjects) {
            return NextResponse.json({ status: 404, message: 'Field Objects not found' });
        }

        if (fieldObjects.length !== data.fieldObjectIndex) {
            return NextResponse.json({ status: 400, message: 'Index expected and index given did not align' });
        }

        const newDescriptionField = { name: 'descriptions', values: data.descriptions, type: "string", trackable: false, mapPiece: false } as IField;
        const newCategoryField = { name: 'category', values: data.categories, type: "string", trackable: false, mapPiece: false } as IField;
        const newGoalField = { name: 'goal', values: data.goals, type: "string", trackable: false, mapPiece: false } as IField;
        const newColorField = { name: 'color', values: data.color, type: "string", trackable: false, mapPiece: false } as IField;
        const newTotalMinutesField = { name: 'totalMinutes', type: "number", values: ['0'], trackable: false, mapPiece: false } as IField;

        const newFieldObject = { fields: [newDescriptionField, newCategoryField, newGoalField, newColorField, newTotalMinutesField] as IField[], entryIndexes: [] as number[] } as IFieldObject;

        fieldObjects = [...fieldObjects, newFieldObject] as IFieldObject[];

        // Assign the updated values back to the user object
        user.userObjects[0] = hobbies;
        user.fieldObjects = fieldObjects;

        // Save the user object
        await user.save();

        return NextResponse.json({ status: 200, message: 'Created!', fieldObjects: fieldObjects, hobbies: hobbies });
    } catch (error: any) {
        console.error('Error creating hobby', error);
        return NextResponse.json({ status: 500, message: "Hobby not created - outside catch" });
    }
}