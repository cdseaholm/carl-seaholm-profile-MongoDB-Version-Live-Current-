import NextAuth from 'next-auth';
//import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import connectDB from './lib/mongodb';
import User from './models/user';
import { VerifyPassword } from './utils/userHelpers/verifyPassword';

export const { handlers, signIn, signOut, auth } = NextAuth({

    providers: [
        //Google,
        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            authorize: async (credentials) => {
                
                try {
                    
                    let user = null;

                    const { email, password } = credentials as Record<string, string>;

                    if (!email || !password) {
                        return null;
                    }

                    await connectDB();
                    user = await User.findOne({ email });
                    if (!user) {
                        return null;
                    }
                    
                    const validPassword = await VerifyPassword(password, user.password);

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