'use client'

import React, { useState } from 'react';

const Projects = () => {
    const [npDropdown, setNpDropdown] = useState(false);
    const [webDropdown, setWebDropdown] = useState(false);
    const [writingDropdown, setWritingDropdown] = useState(false);

    const npapps = [
        {name: "Financr App", description: "Description/Github"},
        {name: "Trackr App", description: "Description/Github"},
        {name: "Gamr App", description: "Description/Github"}
    ];
    const webapps = [
        {name: "Carl Seaholm's Web Profile (here)", description: "Insights"},
        {name: "New Progress Co Site", description: "Insights"}
    ];

    const writingprojects = [
        {name: "Written Within", description: "Brief Synopsis"},
        {name: "Horn Halo Series (working title)", description: "Will have details at a later date"}
    ];

    return (
        <div className='flex justify-evenly flex-col items-center space-y-4'>
            <div className="flex justify-center">
                <h1 className="text-2xl">Projects</h1>
            </div>
            <div className="py-10">
                <div onClick={() => {
                    if (npDropdown === false) {
                        setNpDropdown(true)
                    } else {
                        setNpDropdown(false)
                    }
                }}>
                    <h2 className="text-2xl underline hover:text-slate-300">New Progress Applications</h2>
                </div>
                {npDropdown && npapps.map((app, index) => (
                <div key={index}>
                    <li>{app.name}</li>
                    <p className="pl-10 pb-10">{app.description}</p>
                </div>
                ))}
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

export default Projects;