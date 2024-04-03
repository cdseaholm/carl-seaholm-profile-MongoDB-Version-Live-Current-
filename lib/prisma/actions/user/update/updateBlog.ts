'use server'


import { notFound } from 'next/navigation';
import { lucia } from "@/lib/lucia/lucia";
import { prisma } from "@/prisma/index";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { ActualUser } from '@/types/user';


export default async function createBlogSub({user}: {user: ActualUser}): Promise<string> { 

    const sessionID = generateId(15);

    if (!user) {
        return 'Unauthorized';
    }

    try {
        let sub = await prisma.user.update({
            where: {
                email: user.email,
            },
            data: {
                blogsub: true,
            }
        });
    
        const existingSession = await prisma.session.findUnique({
            where: {
                id: sub.id.toString(),
            }
        });

        let session;
        if (existingSession) {
            session = await prisma.session.update({
                where: {
                    id: sub.id.toString(),
                },
                data: {
                    id: sessionID,
                    userId: sub.id,
                    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                }
            });
        } else {
            session = await prisma.session.create({
                data: {
                    id: sessionID,
                    userId: sub.id,
                    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                }
            });
        }

        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    
        const blogSubCookie = lucia.createSessionCookie(sub.id.toString());
        cookies().set(blogSubCookie.name, blogSubCookie.value, blogSubCookie.attributes);
    
    } catch (e) {
        console.error(e);
        return notFound();
    }

    return 'Subbed';
}