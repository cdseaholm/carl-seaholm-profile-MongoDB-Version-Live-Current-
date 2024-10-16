import NextAuth from 'next-auth';
//import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from './lib/mongodb';
import User from './models/user';

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
                    {/**const validPassword = await argon2id.verify(user.password, password); */}

                    const validPassword = user.password === password;

                    if (!validPassword) {
                        return null;
                    }

                    return user;

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