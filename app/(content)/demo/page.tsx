'use client'

import useMediaQuery from "@/components/listeners/WidthSettings";
import Sidebar from "@/components/sidebar/sidebar";
import SidebarMobile from "@/components/sidebar/sidebarMobile";
import React, { useState } from "react";

const Dashboard = () => {
    const isBreakpoint = useMediaQuery(768);
    const [trackerState, setTrackerState] = useState('' as string);

    return (
        <div className="childFirst min-w-screen min-h-screen my-10 mx-10">
            <h1>
                DEMO!
            </h1>
        </div>
    );
};

export default Dashboard;