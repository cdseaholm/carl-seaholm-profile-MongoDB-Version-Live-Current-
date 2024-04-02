'use server'

import { User } from '@prisma/client';
import { notFound } from 'next/navigation';
import { lucia } from "@/lib/lucia";
import { prisma } from "@/prisma/index";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { Scrypt } from "lucia";

export default async function createUser({formData}: {formData: FormData}): Promise<User[]> { 
    var user = null;
    const username = formData.get("username");
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return notFound();
	}
	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return notFound();
	}
    const email = formData.get("email");
    if (typeof email !== "string" || email.length < 6 || email.length > 255) {
        return notFound();
    }
    const userName = formData.get("username");
    if (typeof userName !== "string" || userName.length < 3 || userName.length > 31) {
        return notFound();
    }

	const hashedPassword = await new Scrypt().hash(password);
    const sessionID = generateId(15);

    try {
        let prismaUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: userName ? userName : null 
            }
        });
        console.log(prismaUser);

        const session = await prisma.session.create({
            data: {
                id: sessionID,
                userId: prismaUser.id,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            }
        });
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        user = prismaUser;
    } catch (e) {
        console.error(e);
        return notFound();
    }
    return user ? [user] : [];
}