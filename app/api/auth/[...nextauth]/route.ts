import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/lib/mongodb';
import User from '@/models/user';
import { Argon2id } from 'oslo/password';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            
            async authorize(credentials) {
                const { email, password } = credentials as Record<string, string>;

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
                return user;
            } catch (error) {
                console.error('error: ',error);
            }
        }})
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    }
});

export { handler as GET, handler as POST };