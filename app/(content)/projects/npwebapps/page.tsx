import Loader from '@/components/misc/loader';
import NPWebApps from '@/components/pagecomponents/np/npwebapps/npwebapps';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'NP Web Apps',
    description: 'A page dedicated to web pages written by New Progress Co.',
}

export default async function Page() {
    const webDropdown = false;

    const webapps = [
        {name: "Carl Seaholm's Web Profile (This site)", description: "A place for me to shocwcase my Development and Design skills, as well as show more insights into my personal and professional life!"},
        {name: "New Progress Co Site", description: "A hub for any cliental to see the services and projects that New Progress Co has to offer."},
        {name: "Working Title - Harbor", description: "A spin off of my personal site, Harbor will be a place for those to combine all that makes them unique as a person into one place."}
    ];

    return (
        <Loader>
            <NPWebApps webDropdown={webDropdown} webapps={webapps}/>
        </Loader>
    );
};