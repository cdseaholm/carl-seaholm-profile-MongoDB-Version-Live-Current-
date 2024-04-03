'use server'

import { ActualUser } from '@/types/user';
import { prisma } from '@/db';
import { notFound } from 'next/navigation';

export async function fetchUsers(): Promise<ActualUser[]> { 
    return await prisma.user.findMany({})
}

export async function fetchUserByID(id: string): Promise<ActualUser | null> {
    const post = await prisma.user.findFirst({
        where: {
            id: parseInt(id)
        }
    })

    if (!post) {
        notFound()
    }

    return post
}