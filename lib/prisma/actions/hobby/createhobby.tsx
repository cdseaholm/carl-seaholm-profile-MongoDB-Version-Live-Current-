'use server'

import { prisma } from "@/db";
import { ActualUser } from "@/types/user";

export default async function CreateHobby({formData, user, categoryPassed}: {formData: FormData; user: ActualUser | null; categoryPassed: string}): Promise<string> {
    
    var userID = null;
    const title = formData.get("name");
    if (typeof title !== "string" || title === "" || title === null || title.length === 0) {
        throw new Error("Invalid title");
    }

    const description = formData.get("description");
    if (typeof description !== "string") {
        throw new Error("Invalid description");
    }

    const goal = formData.get("goalValue");
    if (typeof goal !== "string") {
        throw new Error("Invalid goal");
    }

    const category = categoryPassed;
    if (typeof category !== "string") {
        throw new Error("Invalid category");
    }
    
    if (user !== null) {
        userID = user.id;
    } else {
        throw new Error("Invalid user");
    }

    const hobby = await prisma.hobby.create({
        data: {
            title: title,
            descriptions: [description],
            category: [category],
            goal: [goal],
            userId: userID
        },
    });

    if (!hobby) {
        throw new Error("Error creating hobby");
    }

    return 'Hobby created successfully';
};