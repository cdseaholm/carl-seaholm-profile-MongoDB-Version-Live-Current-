'use client'

import MainChild from '@/components/pagetemplates/mainchild/mainchild';
import React, { useState } from 'react';

const NPWebAppPage = () => {
    const [webDropdown, setWebDropdown] = useState(false);

    const webapps = [
        {name: "Carl Seaholm's Web Profile (This site)", description: "A place for me to shocwcase my Development and Design skills, as well as show more insights into my personal and professional life!"},
        {name: "New Progress Co Site", description: "A hub for any cliental to see the services and projects that New Progress Co has to offer."},
        {name: "Working Title - Harbor", description: "A spin off of my personal site, Harbor will be a place for those to combine all that makes them unique as a person into one place."}
    ];

    return (
        <MainChild>
            <div className="p-2">
                <div className="flex justify-center pb-10 p-2">
                    <h1 className="text-2xl">New Progress Web Applications</h1>
                </div>
                <div className='flex flex-col justify-center items-start'>
                {webDropdown && webapps.map((app, index) => (
                    <div key={index}>
                        <li>{app.name}</li>
                        <p className="pl-10 pb-10">{app.description}</p>
                    </div>   
                ))}
                </div>
            </div>
        </MainChild>
    );
};

export default NPWebAppPage;