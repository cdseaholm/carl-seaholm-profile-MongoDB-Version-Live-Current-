import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import MongoUser from "@/models/user";
import { VerifyPassword } from "@/utils/userHelpers/verifyPassword";
import connectDB from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials as Record<string, string>;

          if (!email || !password) {
            return null;
          }

          await connectDB();
          const user = await MongoUser.findOne({ email });
          if (!user) {
            return null;
          }

          const validPassword = await VerifyPassword(password, user.password);
          if (!validPassword) {
            return null;
          }

          const plainUser = user.toObject();
          const userID = plainUser._id.toString();
          return {
            id: userID,
            email: plainUser.email,
            name: plainUser.name,
          };
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    })
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };