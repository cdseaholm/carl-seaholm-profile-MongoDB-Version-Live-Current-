import NextAuth from 'next-auth';
//import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/lib/mongodb';
import User from '@/models/user';
import { Argon2id } from 'oslo/password';

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
                    await connectDB();
                    const user = await User.findOne({ email });
                    if (!user) {
                        return null;
                    }

                    const validPassword = await new Argon2id().verify(
                        user.password,
                        password
                    );
                    if (!validPassword) {
                        return null;
                    }
                    return {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        customFields: user.customFields,
                    }
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