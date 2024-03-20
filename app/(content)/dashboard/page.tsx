'use client'

import Sidebar from "@/components/sidebar/sidebar";
import React, { useState } from "react";

const Dashboard = () => {
    const [trackerState, setTrackerState] = useState('' as string);
    return (
        <div className="childFirst min-w-screen min-h-screen my-10 mx-10 pt-5 pl-5">
            <div className='flex justify-start'>
                <Sidebar setTrackerState={setTrackerState} />
            </div>
        </div>
    );
};

export default Dashboard;