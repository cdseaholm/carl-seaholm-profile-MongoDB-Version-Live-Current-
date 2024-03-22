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
            {/*
            <div className='flex justify-start'>
                
                {!isBreakpoint &&
                <Sidebar setTrackerState={setTrackerState} />
                }
                {isBreakpoint &&
                <SidebarMobile setTrackerState={ setTrackerState } />
                }
                */}
                <div className='flex justify-center items-center'>
                    <div className="flex flex-col justify-center items-center">
                    <h1 className='text-5xl font-bold'>Dashboard</h1>
                    <h2 className='text-lg font-bold'>Welcome to the dashboard.</h2>
                    <p className="py-10 w-5/6">
                        This is a dashboard for the website. It is a place to manage the website and see the statistics. I understand that it might look underdeveloped at this point. It is however a work in progress. I am working on it and it will be updated soon. I only began to shift my work over from WordPress to here around March 15th. 
                    </p>
                    <p className="w-5/6">
                        Feel free to look around where you can and give me feedback. I am always looking for ways to improve the website. Otherwise check back soon for more updates!
                    </p>
                    </div>
                </div>
        </div>
    );
};

export default Dashboard;