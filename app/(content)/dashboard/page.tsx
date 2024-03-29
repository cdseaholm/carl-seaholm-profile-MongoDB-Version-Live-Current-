'use client'

import React from "react";
import InnerHeader from "@/components/pagetemplates/innerheader/InnerHeader";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import Sidebar from "@/components/dropdown/sidebar";
import useMediaQuery from "@/components/listeners/WidthSettings";

const Dashboard = () => {
    
    const isBreakpoint = useMediaQuery(768);

    return (
        <div>
            <InnerHeader>
                <Sidebar />
                <div className="flex flex-col justify-end">
                    <h1 className={`${isBreakpoint ? 'text-xl' : 'text-4xl'} font-bold`}>Dashboard</h1>
                </div>
            </InnerHeader>
            <MainChild>
                <div></div>
            </MainChild>
        </div>
    );
};

export default Dashboard;