'use client'

import LoadingSpinner from "@/app/(content)/projects/school/infoVis-DatasetProject/components/components/misc/loadingSpinner";
import { SessionProvider } from "next-auth/react"
import { useEffect, useState } from "react";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        loading ? (
            <div className="flex flex-col justify-start items-center w-screen h-screen bg-white/50 overflow-hidden">
                <div className="flex flex-col justify-start items-center w-screen h-screen bg-slate-900/50 overflow-hidden">
                    <LoadingSpinner />
                </div>
            </div>
        ) : (
            <SessionProvider>
                {children}
            </SessionProvider>
        )
    )
}