"use server"

import { lucia } from "@/lib/lucia";
import { prisma } from "../../../prisma/index";
import { cookies } from "next/headers";
import { Scrypt, generateId } from "lucia";

export default async function login({formData}: {formData: FormData})
    : Promise<{user: any, session: any} | string> {

    const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		throw new Error("Invalid password");
	}
    const email = formData.get("email");
    if (typeof email !== "string" || email.length < 6 || email.length > 255 || !/^\S+@\S+\.\S+$/.test(email)) {
        throw new Error("Invalid email");
    }
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    if (!user) {
        return 'User not found';
    } else if (!email || !password) {
        return 'Invalid email or password';
    }

    if (typeof email !== "string" || email.length < 3 || email.length > 255 || !/^\S+@\S+\.\S+$/.test(email)) {
        return 'Invalid email';
    }

    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
        return 'Invalid password';
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });

    if (!existingUser) {
        return 'Incorrect email or password';
    }

    const validPassword = await new Scrypt().verify(existingUser.password, password);
    if (!validPassword) {
        return 'Incorrect email or password';
    }

    const sessionID = generateId(15);
    
    const session = await prisma.session.create({
        data: {
            id: sessionID,
            userId: existingUser.id,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        }
    });
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    //potential to not make user log in constantly ~~C

    return {user: existingUser, session: session};
}