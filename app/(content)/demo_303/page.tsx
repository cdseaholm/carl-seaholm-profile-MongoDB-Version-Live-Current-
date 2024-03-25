'use client'

import useMediaQuery from "@/components/listeners/WidthSettings";
import Sidebar from "@/components/sidebar/sidebar";
import SidebarMobile from "@/components/sidebar/sidebarMobile";
import React, { useState } from "react";
import DemoSidenavMobile from "./demonav/demomobilenav";
import DemoSidenavPage from "./demonav/demodesknav";
import FooterNavBar from "@/components/nav/footer/footerNavbar";
import MobileDemoBody from "./components/mobiledemobody";
import DemoBody from "./components/demobody";

const Dashboard = () => {
    const isBreakpoint = useMediaQuery(768);

    return (
        <div>
            <div>
                {isBreakpoint && 
                <>
                <DemoSidenavMobile/>
                <MobileDemoBody/>
                </>
                }
                {!isBreakpoint &&
                <>
                <DemoSidenavPage/>
                <DemoBody/>
                </>
                }
            </div>
        </div>
    );
};

export default Dashboard;