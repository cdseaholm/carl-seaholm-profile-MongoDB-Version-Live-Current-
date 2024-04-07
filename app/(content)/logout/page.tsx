'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/app/context/session/SessionContext';
import InnerHeader from '@/components/pagetemplates/innerheader/InnerHeader';
import MainChild from '@/components/pagetemplates/mainchild/mainchild';
import { useModalContext } from '@/app/context/modal/modalContext';

const ProfilePage = () => {

    const { handleLogout } = useModalContext();

    return (
        <>
        <InnerHeader>
            <h1 className="text-lg underline">Logout</h1>
        </InnerHeader>
        <MainChild>
            <div className="flex justify-center">
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </MainChild>
        </>
    );
};

export default ProfilePage;