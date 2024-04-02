'use server'

import { User } from '@prisma/client';
import { prisma } from '../../../../prisma/index';
import { notFound } from 'next/navigation';

export async function fetchUsers(): Promise<User[]> { 
    return await prisma.user.findMany({})
}

export async function fetchUserByID(id: string): Promise<User | null> {
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