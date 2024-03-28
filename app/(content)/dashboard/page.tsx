'use client'

import useMediaQuery from "@/components/listeners/WidthSettings";
import Sidebar from "@/components/sidebar/sidebar";
import SidebarMobile from "@/components/sidebar/sidebarMobile";
import MobileTaskTracker from "@/components/trackers/mobiletaskTracker";
import TaskTracker from "@/components/trackers/taskTrackers";
import React, { useState } from "react";

const Dashboard = () => {
    const isBreakpoint = useMediaQuery(768);
    const divRef = React.useRef(null);
    const [trackerState, setTrackerState] = useState('' as string);

    return (
        <div className={`childFirst ${isBreakpoint ? 'my-4 py-2 mx-8 px-2' : 'mb-8 py-2 mx-20 px-2'}`}  style={{ minHeight: '80vh', maxHeight: '80vh'}}>
                <div className='flex flex-col justify-between'>
                    {/*
                    <div className="w-1/4 px-2">
                    {!isBreakpoint &&
                    <Sidebar setTrackerState={setTrackerState} />
                    }
                    {isBreakpoint &&
                    <SidebarMobile setTrackerState={ setTrackerState } />
                    }
                    </div>
                    {/**<div className="flex flex-col justify-end">
                        <h1 className='text-5xl font-bold'>Dashboard</h1>
                    </div>
                    */}
                    <h1 className='text-5xl font-bold'>Dashboard</h1>
                    <h2 className='text-lg font-bold'>Welcome to the dashboard.</h2>
                    <p className="py-10 w-5/6">
                        This is a dashboard for the website. It is a place to manage the website and see the statistics. I understand that it might look underdeveloped at this point. It is however a work in progress. I am working on it and it will be updated soon. I only began to shift my work over from WordPress to here around March 15th. 
                    </p>
                    <p className="w-5/6">
                        Feel free to look around where you can and give me feedback. I am always looking for ways to improve the website. Otherwise check back soon for more updates!
                    </p>
                </div>
                {/**
                <div style={{ maxHeight: '80vh', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(100, 116, 139, 1) rgba(0, 0, 0, 0.1)',}} ref={divRef}>
                    {isBreakpoint &&
                        <MobileTaskTracker />
                    }
                    {!isBreakpoint &&
                        <TaskTracker />
                    }
                </div>*/}
        </div>
    );
};

export default Dashboard;