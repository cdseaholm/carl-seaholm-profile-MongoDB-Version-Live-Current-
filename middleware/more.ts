import { NextRequest, NextResponse } from 'next/server';

export async function more(req: NextRequest) {
    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : `${process.env.NEXT_PUBLIC_BASE_LIVEURL || process.env.NEXT_PUBLIC_BASE_URL}`;

    if (req.method === 'OPTIONS') {
        return new NextResponse(null, {
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': url,
                'Access-Control-Allow-Methods': 'GET, OPTIONS, POST, PUT, DELETE, PATCH',
                'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                'Content-Type': 'application/json'
            },
            status: 200
        });
    }

    return NextResponse.next();
}