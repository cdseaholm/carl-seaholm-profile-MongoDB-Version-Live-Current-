'use client'

import { Spinner } from "../misc/Spinner";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";


export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <AuthContent>{children}</AuthContent>
        </SessionProvider>
    );
}

function AuthContent({ children }: { children: ReactNode }) {
    const { data: _session, status } = useSession();

    if (status === "loading") {
        return (
            <main className="w-screen h-screen scrollbar-thin scrollbar-webkit bg-white/50" style={{ overflowX: 'hidden', overflowY: 'auto' }}>
                <Spinner />
            </main>
        )
    }

    return (
        <>
            {children}
        </>
    );
}