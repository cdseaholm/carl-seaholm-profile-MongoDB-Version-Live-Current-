import { NextResponse } from "next/server";

export function middleware() {
    return new NextResponse(null, {
        headers: {
            'Access-Control-Allow-Credentials': "true",
            'Access-Control-Allow-Origin': 'https://www.carlseaholm.com',
            'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
            'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        }
    });
}

export const config = {
    matcher: '/api/:path*',
}