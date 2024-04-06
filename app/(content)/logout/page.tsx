'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import logoutAuth from '@/app/api/auth/logout';
import { useSession } from '@/app/SessionContext';
import InnerHeader from '@/components/pagetemplates/innerheader/InnerHeader';
import MainChild from '@/components/pagetemplates/mainchild/mainchild';

const ProfilePage = () => {
    const router = useRouter();

    const { user, logout } = useSession();

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to log out?')) {
            const loggingOut = await logoutAuth();
            if (loggingOut === 'Logged out successfully') {
                logout();
                router.push('/login');
            } else {
                alert('Already logged out');
                console.log(loggingOut);
            }
        }
    };

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