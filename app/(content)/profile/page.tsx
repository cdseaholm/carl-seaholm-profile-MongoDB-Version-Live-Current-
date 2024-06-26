'use client'

import React from 'react';
import InnerHeader from '@/components/pagetemplates/innerheader/InnerHeader';
import MainChild from '@/components/pagetemplates/mainchild/mainchild';
import { useModalStore } from '@/context/modalStore';

const ProfilePage = () => {

    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const handleLogout = () => {
        console.log('logout');
    }

    const showPassword = async () => {
        
    }

    return (
        <>
        <InnerHeader>
            <h1 className="text-lg underline">Profile</h1>
        </InnerHeader>
        <MainChild>
            <div className="flex flex-col justify-center space-y-4 p-4">
                <button onClick={() => setModalOpen('edituser')}>
                    Edit Profile
                </button>
                <button onClick={showPassword}>
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

export default ProfilePage;