'use server'

import { ActualUser } from "@/types/user";
import { lucia } from "../../../../../lib/lucia";
import { prisma } from '../../../../../prisma/index';
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { Scrypt } from "lucia";

export default async function createUser({formData}: {formData: FormData}): Promise<ActualUser[]> { 
    var user = null;
        
	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		throw new Error("Invalid password");
	}
    const email = formData.get("email");
    if (typeof email !== "string" || email.length < 6 || email.length > 255 || !/^\S+@\S+\.\S+$/.test(email)) {
        throw new Error("Invalid email");
    }
    let username = formData.get("username");
    if (
        username !== null &&
        username !== undefined &&
        (
            typeof username !== "string" ||
            username.length < 3 ||
            username.length > 31 ||
            !/^[a-z0-9_-]+$/.test(username)
        )
    ) {
        throw new Error("Invalid username");
    } else if (username === null || username === undefined) {
        username = null;
    }

	const hashedPassword = await new Scrypt().hash(password);
    const sessionID = generateId(15);

    try {
        let prismaUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: username ? username : null 
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
        throw new Error("User not created");
    }
    return user ? [user] : [];
}