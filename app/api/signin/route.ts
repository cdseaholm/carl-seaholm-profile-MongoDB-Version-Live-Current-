
import connectDB from '@/lib/mongodb';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {

    try {
        const body = await req.json();
        const email = body.email;
        const password = body.password;

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' });
        }
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' });
        }

        const validPassword = password === user.password;

        {/**const validPassword = await argon2id.verify(passwordToCheck, password); */ }
        if (!validPassword) {
            return NextResponse.json({ error: 'Invalid password' });
        }

        return NextResponse.json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error('error: ', error);
        return NextResponse.json({ error: 'Internal server error' });
    }
}