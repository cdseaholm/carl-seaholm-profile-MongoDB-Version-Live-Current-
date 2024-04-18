import { Lucia, TimeSpan } from 'lucia';
import { adapter } from '@/lib/lucia/adapter';
import { ActualUser } from '@/models/types/user';

export const lucia = new Lucia(adapter, {
    getUserAttributes: (attributes: any) => {
      return {
        email: attributes.email,
        firstName: attributes.firstName,
        lastName: attributes.lastName,
        blogsub: attributes.blogsub,
      };
    },
    sessionExpiresIn: new TimeSpan(30, 'd'),
    sessionCookie: {
      expires: false,
      attributes: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      },
    },
  });

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<ActualUser, "id">;
  }
}