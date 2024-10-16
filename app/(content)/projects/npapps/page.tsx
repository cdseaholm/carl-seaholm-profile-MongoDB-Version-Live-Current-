
import NPAppsPage from '@/components/pagecomponents/np/npapps/npapps';
import MainPageBody from '@/components/pagetemplates/mainpagebody/mainpagebody';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'NPApps Page',
    description: 'A page dedicated to the side projects that consist of New Progress Applications.',
}

export default async function Page() {
    return (
        <MainPageBody>
            <NPAppsPage />
        </MainPageBody>
    );
};