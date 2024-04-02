'use server'

import { Hobby } from '@prisma/client';
import { prisma } from '../../../../prisma/index';
import { notFound } from 'next/navigation';
import { validateRequest } from '@/lib/auth';

export async function fetchHobbies(): Promise<Hobby[]> { 
    const valid = await validateRequest();
    if (!valid.user) {
        return notFound();
    }
    return await prisma.hobby.findMany({
        where: {
            id: valid.user.id
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