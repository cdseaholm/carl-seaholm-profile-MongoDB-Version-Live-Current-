'use client'

import { AuthProvider } from "@/app/context/session/SessionContext";
import { AnimatePresence } from "framer-motion";

export default function AnimateAndAuthWrapper({children}: Readonly<{
children: React.ReactNode;}>) {
    return (
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </AnimatePresence>
    );
}