import NextAuth from 'next-auth';
//import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PassCheck } from './utils/helpers/passCheck';
import { getUrl } from './utils/helpers/config';

export const { handlers, signIn, signOut, auth } = NextAuth({

    providers: [
        //Google,
        CredentialsProvider({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },

            async authorize(credentials) {
                const { email, password } = credentials as Record<string, string>;
                if (!email || !password) {
                    return null;
                }

                try {
                    const urlToUse = await getUrl();
                    const authenticated = await PassCheck(password, email, urlToUse);
                    if (!authenticated) {
                        return null;
                    }

                    return {
                        id: authenticated.id,
                        email: authenticated.email,
                        name: authenticated.name,
                    };

                } catch (error) {
                    console.error('error: ', error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin',
    }
});