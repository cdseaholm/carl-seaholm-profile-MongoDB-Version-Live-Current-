'use client'

import useMediaQuery from "@/components/listeners/WidthSettings";
import React, { useEffect, useState } from "react";
import DemoSidenavMobile from "./demonav/demomobilenav";
import DemoSidenavPage from "./demonav/demodesknav";
import MobileDemoBody from "./components/mobiledemobody";
import DemoBody from "./components/demobody";

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