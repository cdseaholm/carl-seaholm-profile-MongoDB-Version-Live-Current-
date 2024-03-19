'use client'

import React, { useState } from 'react';

const WritingPage = () => {
    const [writingDropdown, setWritingDropdown] = useState(false);

    const writingprojects = [
        {name: "Written Within", description: "Brief Synopsis"},
        {name: "Horn Halo Series (working title)", description: "Will have details at a later date"}
    ];

    return (
        <div className='flex justify-evenly flex-col items-center space-y-4'>
            <div className="flex justify-center">
                <h1 className="text-2xl">Writing Projects</h1>
            </div>
            <div className="py-10">
            <div onClick={() => {
                    if (writingDropdown === false) {
                        setWritingDropdown(true)
                    } else {
                        setWritingDropdown(false)
                    }
                }}>
                    <h2 className="text-2xl underline hover:text-slate-300">Writing Projects</h2>
                </div>
                {writingDropdown && writingprojects.map((app, index) => (
                <div key={index}>
                    <li>{app.name}</li>
                    <p className="pl-10 pb-10">{app.description}</p>
            </div>  

            ))}
            </div>
        </div>
    );
};

export default WritingPage;