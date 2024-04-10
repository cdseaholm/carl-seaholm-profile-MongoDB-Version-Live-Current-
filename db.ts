import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { PrismaClient } from '@prisma/client';
import { Lucia } from 'lucia';
import { withAccelerate } from '@prisma/extension-accelerate'

export const prisma = new PrismaClient().$extends(withAccelerate())

export const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: process.env.NODE_ENV === 'production',
        }
    }
});

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    email: string;
    name: string | null;
    password: string;
    blogsub: boolean;
}