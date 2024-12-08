import connectDB from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

/**
 * @method GET
 * @param NextResponse 
 * @description Find All Prompts and return
 */

export const GET = async (request: NextRequest) => {
    await connectDB();

    const path = request.nextUrl.searchParams.get('path');

    if (path) {
        try {
            revalidatePath(path);
            return NextResponse.json({ revalidated: true, now: Date.now() });
        } catch (err: any) {
            return NextResponse.json({ error: 'Failed to revalidate', details: err.message });
        }
    }

    return NextResponse.json({
        revalidated: false,
        now: Date.now(),
        message: 'Missing path to revalidate',
    });
};