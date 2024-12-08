import connectDB from "@/lib/mongodb";
import { IEntry } from "@/models/types/entry";
import { IFieldObject } from "@/models/types/field";
import { IUser } from "@/models/types/user";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {


    try {

        const body = await req.json();
        await connectDB();


        const user = await User.findOne({ email: body.user }) as IUser;

        if (!user) {
            return NextResponse.json({ status: 404, message: "Not authorized", newIndex: -1 });
        }

        const newEntry = body.newEntry as IEntry;
        const hobbyTitle = body.hobbyTitle as string;

        if (!newEntry) {
            return NextResponse.json({ status: 400, message: "Missing new entry", newIndex: -1 });
        } else if (!hobbyTitle) {
            return NextResponse.json({status: 404, message: "Title needed", newIndex: -1})
        }

        const hobbyIndex = user.userObjects[0]?.indexes.find((index) => index.title === hobbyTitle)?.index as number;

        if (hobbyIndex === undefined) {
            return NextResponse.json({ status: 404, message: "Hobby not found", newIndex: -1 });
        }

        const hobbyField = user.fieldObjects[hobbyIndex] as IFieldObject;

        if (!hobbyField) {
            return NextResponse.json({ status: 404, message: "Hobby title not found", newIndex: -1 });
        }

        user.entries = [...user.entries, newEntry] as IEntry[];

        const newIndex = user.entries.length - 1 as number;
        let totalMinutes = hobbyField.fields.find((field) => field.name === 'totalMinutes')?.values as string[];
        if (totalMinutes) {
            let currMins = Number(totalMinutes[0]);
            if (currMins && currMins > 0) {
                let newMins = currMins + Number(newEntry.value) as number;
                totalMinutes[0] = newMins.toString();
            } else {
                totalMinutes[0] = newEntry.value as string;
            }
        }
        hobbyField.entryIndexes = [...hobbyField.entryIndexes, newIndex] as number[];

        await user.save();

        return NextResponse.json({ status: 200, message: "Hobby updated successfully", newIndex: newIndex});
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ status: 500, message: error.message, newIndex: -1 });
    }
}

