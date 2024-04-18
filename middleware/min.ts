import { NextRequest, NextResponse } from 'next/server';

export async function min(req: NextRequest, res: NextResponse) {
    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : `${process.env.NEXT_PUBLIC_BASE_LIVEURL || process.env.NEXT_PUBLIC_BASE_URL}`;

    if (req.method === 'OPTIONS') {
        return new NextResponse(null, {
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': url,
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                'Content-Type': 'application/json'
            },
            status: 200
        });
    }

    const d = new Date();
    return new NextResponse(JSON.stringify({ status: 200, message: d.toISOString() }), {
        headers: {
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': url,
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
            'Content-Type': 'application/json'
        }
    });
}