{/*import { prisma } from "@/db";
import { Scrypt, generateId } from "lucia";

export default async function login({formData}: {formData: FormData}) {
    const email = formData.get('loginEmail') as string;
    const password = formData.get('loginPassword') as string;
    if (!email || !password) {
        return {error: 'Invalid email or password'};
    } else if (typeof email !== "string" || email.length < 6 || email.length > 255 || !/^\S+@\S+\.\S+$/.test(email)) {
        return {error: 'Invalid email'};
    } else if (typeof password !== "string" || password.length < 6 || password.length > 255) {
        return {error: 'Invalid password'};
    } else {
        try {
            const userCheck = await prisma.user.findFirst({
                where: {
                    email: email
                },
            });
            if (!userCheck) {
                return {error: 'User not found'};
            } else {
                const validPassword = await new Scrypt().verify(userCheck.password, password);
                if (!validPassword) {
                    return {error: 'Password is incorrect'};
                }
                const sessionID = generateId(15);
                const session = await prisma.session.create({
                    data: {
                        id: sessionID,
                        userId: userCheck.id,
                        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                    }
                });
                return {user: userCheck, session: session};
            }
        } catch (error: any) {
            console.error('Database error:', error);
            return {error: 'Database error'};
        }
    }
}*/}