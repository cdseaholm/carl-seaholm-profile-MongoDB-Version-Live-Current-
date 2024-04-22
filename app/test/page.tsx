'use client'

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";



export default function Page() {
    const { data: session } = useSession();


    return (
        <div>
        <h1>HELLO! THIS IS RENDERING</h1>
        <div className="flex flex-col">
            {session?.user ? session.user.name : 'No user'}
            {session === null ? 'Null' : 'Not Null'}
            {session?.user?.email === undefined ? 'Undefined' : 'Not Undefined'}
        </div>
        </div>
    );
}