'use server'

import { prisma } from "@/db";

export default async function UpdateHobbySession({formData, userID}: {formData: FormData; userID: number}): Promise<string> {
    
    if (userID === null) {
        throw new Error("Invalid User ID");
    }

    const sessionTime = formData.get("sessionTime")?.toString();
    if (typeof sessionTime !== "string" || sessionTime === "" || sessionTime === null) {
        throw new Error("Invalid Session Time");
    }
    
    const sessionDate = formData.get("sessionDate")?.toString();
    if (typeof sessionDate !== "string") {
        throw new Error("Invalid Date");
    }

    const hobby = await prisma.hobby.update({
        where: {
            id: userID
        },
        data: {
            minutesXsession: {
                push: sessionTime
            },
            date: {
                push: sessionDate
            }
        },
    });

    if (!hobby) {
        throw new Error("Error creating hobby");
    }

    return 'Hobby created successfully';
};