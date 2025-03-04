import React from 'react';
import InnerHeader from '@/components/pagetemplates/innerheader/InnerHeader';
import MainChild from '@/components/pagetemplates/mainchild/mainchild';
import { Metadata } from 'next';
import MainPageBody from '@/components/pagetemplates/mainpagebody/mainpagebody';

export const metadata: Metadata = {
    title: 'Logout Page',
    description: 'A page that allows users to logout.',
}

export default async function Page() {

    return (
        <MainPageBody>
            <InnerHeader>
                <h1 className="text-lg underline">Logout</h1>
            </InnerHeader>
            <MainChild>
                <div className="flex justify-center p-4">
                    <button>
                        Logout
                    </button>
                </div>
            </MainChild>
        </MainPageBody>
    );
};