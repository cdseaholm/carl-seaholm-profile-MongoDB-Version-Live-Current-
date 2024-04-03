'use server'

import { Hobby } from '@/types/hobby';
import { prisma } from '@/prisma/index';
import { notFound } from 'next/navigation';
import { ActualUser } from '@/types/user';

export default async function fetchHobbies({user}: {user: ActualUser}): Promise<Hobby[]> { 

    if (!user) {
        return notFound();
    }
    return await prisma.hobby.findMany({
        where: {
            id: user.id
        }
    })
}

export async function fetchUserByName(title: string): Promise<Hobby | null> {
    const post = await prisma.hobby.findFirst({
        where: {
            title: title
        }
    })

    if (!post) {
        notFound()
    }

    return post
}