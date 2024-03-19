'use client'

import React, { useState } from 'react';

const NPWebAppPage = () => {
    const [webDropdown, setWebDropdown] = useState(false);

    const webapps = [
        {name: "Carl Seaholm's Web Profile (here)", description: "Insights"},
        {name: "New Progress Co Site", description: "Insights"}
    ];

    return (
        <div className='flex justify-evenly flex-col items-center space-y-4'>
            <div className="flex justify-center">
                <h1 className="text-2xl">New Progress Web Applications</h1>
            </div>
            <div className="py-10">
            <div onClick={() => {
                    if (webDropdown === false) {
                        setWebDropdown(true)
                    } else {
                        setWebDropdown(false)
                    }
                }}>
                    <h2 className="text-2xl underline hover:text-slate-300">Web Applications</h2>
                </div>
                {webDropdown && webapps.map((app, index) => (
                <div key={index}>
                    <li>{app.name}</li>
                    <p className="pl-10 pb-10">{app.description}</p>
                </div>   
                ))}
            </div>
        </div>
    );
};

export default NPWebAppPage;