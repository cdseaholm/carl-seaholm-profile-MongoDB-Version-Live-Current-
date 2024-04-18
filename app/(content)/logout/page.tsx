'use client'

import React from 'react';
import InnerHeader from '@/components/pagetemplates/innerheader/InnerHeader';
import MainChild from '@/components/pagetemplates/mainchild/mainchild';

const LogoutPage = () => {

    return (
        <>
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
        </>
    );
};

export default LogoutPage;