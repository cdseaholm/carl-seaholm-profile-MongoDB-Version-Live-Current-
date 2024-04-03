'use client'

import useMediaQuery from "@/components/listeners/WidthSettings";
import React, { useEffect } from "react";
import DemoSidenavMobile from "@/app/(content)/demo_303/demonav/demomobilenav";
import DemoSidenavPage from "@/app/(content)/demo_303/demonav/demodesknav";
import MobileDemoBody from "@/app/(content)/demo_303/components/mobiledemobody";
import DemoBody from "@/app/(content)/demo_303/components/demobody";

const DemoPage = () => {
    const isBreakpoint = useMediaQuery(768);

    useEffect(() => {

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
            <div className="min-w-screen min-h-screen">
                {isBreakpoint && 
                <>
                <DemoSidenavMobile/>
                <MobileDemoBody/>
                </>
                }
                {!isBreakpoint &&
                <>
                <DemoSidenavPage/>
                <DemoBody />
                </>
                }
            </div>
    );
};

export default DemoPage;