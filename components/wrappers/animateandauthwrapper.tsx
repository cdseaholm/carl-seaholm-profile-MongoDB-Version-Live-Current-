'use client'

import { AuthProvider } from "@/app/context/session/SessionContext";


export default function AnimateAndAuthWrapper({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}