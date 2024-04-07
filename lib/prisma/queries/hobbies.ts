'use server'

import { Hobby } from '@/types/hobby';
import { prisma } from '@/db';
import { notFound } from 'next/navigation';
import { ActualUser } from '@/types/user';

export default async function fetchHobbies({user, adminID}: {user: ActualUser | null; adminID: number}): Promise<Hobby[]> { 

    var idToUse = 0;
    if (!user) {
        idToUse = adminID;
        //return notFound();
    } else {
        idToUse = user.id;
    }
    const hobbies = await prisma.hobby.findMany({
        where: {
            userId: idToUse
        }
    })

    if (!hobbies) {
        return notFound();
    }

    return hobbies;
}

export async function fetchUserByName(title: string): Promise<Hobby | null> {
    const post = await prisma.hobby.findFirst({
        where: {
            title: title,
        }
    })

    if (!post) {
        notFound()
    }

    return post
}