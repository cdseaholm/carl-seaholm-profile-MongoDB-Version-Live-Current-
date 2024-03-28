'use client'

import React, { useRef } from 'react';

const MobileTaskTracker = () => {
    const divRef = useRef(null);
    return (
        <div className='flex flex-col p-5 mt-5 bg-white/30 rounded-md' style={{minHeight: '70vh', maxHeight: '70vh', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(100, 116, 139, 1) rgba(0, 0, 0, 0.1)'}} ref={divRef}>
            <div style={{ minHeight: '70vh', maxHeight: '70vh'}}>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl font-bold'>Task Tracker</h1>
                    <button className='bg-blue-500 text-white px-2 py-1 rounded-lg'>Add Task</button>
                </div>
                <div className='flex flex-col'>
                    <div className='flex justify-between'>
                        <h1 className='text-2xl font-bold'>Task</h1>
                        <h1 className='text-2xl font-bold'>Status</h1>
                    </div>
                    <div className='flex justify-between'>
                        <h1 className='text-xl font-bold'>Task 1</h1>
                        <h1 className='text-xl font-bold'>Completed</h1>
                    </div>
                    <div className='flex justify-between'>
                        <h1 className='text-xl font-bold'>Task 2</h1>
                        <h1 className='text-xl font-bold'>In Progress</h1>
                    </div>
                    <div className='flex justify-between'>
                        <h1 className='text-xl font-bold'>Task 3</h1>
                        <h1 className='text-xl font-bold'>Not Started</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileTaskTracker;