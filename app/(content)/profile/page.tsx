'use client'

import React from 'react';
import InnerHeader from '@/components/pagetemplates/innerheader/InnerHeader';
import MainChild from '@/components/pagetemplates/mainchild/mainchild';
import { useModalContext } from '@/app/context/modal/modalContext';

const LogoutPage = () => {
    const { setShowEditUser } = useModalContext();
    const handleLogout = () => {
        console.log('logout');
    }

    return (
        <>
        <InnerHeader>
            <h1 className="text-lg underline">Profile</h1>
        </InnerHeader>
        <MainChild>
            <div className="flex flex-col justify-center space-y-4">
                <button onClick={() => setShowEditUser(true)}>
                    Edit Profile
                </button>
                <button>
                    Change Password
                </button>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </MainChild>
        </>
    );
};

export default LogoutPage;