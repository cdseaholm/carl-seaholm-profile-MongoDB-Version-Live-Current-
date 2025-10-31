import connectDB from "@/lib/mongodb";
import MongoUser from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "@/models/types/user";
import { getServerSession, User } from "next-auth";
import { getToken } from "next-auth/jwt";
import { IFieldObject, IField } from "@/models/types/field";
import { IUserObjectIndexed } from "@/models/old/types/userObjectIndexed";

export async function POST(req: NextRequest) {

    const secret = process.env.NEXTAUTH_SECRET ? process.env.NEXTAUTH_SECRET : '';

    if (secret === '') {
        return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }

    const session = await getServerSession({ req, secret })
    const token = await getToken({ req, secret });

    if (!session || !token) {
        return NextResponse.json({ status: 401, message: 'Unauthorized' });
    }

    try {
        const body = await req.json();
        await connectDB();
        const userSesh = session?.user as User;
        const email = userSesh ? userSesh.email : '';

        if (!body.title) {
            return NextResponse.json({ status: 400, message: "Invalid Title" });
        }

        if (!body.user_email) {
            return NextResponse.json({ status: 400, message: "User must be signed in" });
        }

        if (email === '') {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const user = await MongoUser.findOne({ email: email }) as IUser;

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

        const newIndex = { title: body.title, index: body.fieldObjectIndex } as IUserObjectIndexed;
        if (!newIndex) {
            return NextResponse.json({ status: 400, message: 'Error indexing hobby' });
        }

        hobbies.indexes = [...indexes, newIndex] as IUserObjectIndexed[];

        let fieldObjects = user.fieldObjects as IFieldObject[];
        if (!fieldObjects) {
            return NextResponse.json({ status: 404, message: 'Field Objects not found' });
        }

        if (fieldObjects.length !== body.fieldObjectIndex) {
            return NextResponse.json({ status: 400, message: 'Index expected and index given did not align' });
        }

        const newDescriptionField = { name: 'descriptions', values: body.descriptions, type: "string", trackable: false, mapPiece: false } as IField;
        const newCategoryField = { name: 'category', values: body.categories, type: "string", trackable: false, mapPiece: false } as IField;
        const newGoalField = { name: 'goal', values: body.goals, type: "string", trackable: false, mapPiece: false } as IField;
        const newColorField = { name: 'color', values: body.color, type: "string", trackable: false, mapPiece: false } as IField;
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