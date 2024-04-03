'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import logoutAuth from '@/app/api/auth/logout';
import { useSession } from '@/app/SessionContext';
import InnerHeader from '@/components/pagetemplates/innerheader/InnerHeader';
import MainChild from '@/components/pagetemplates/mainchild/mainchild';

const LogoutPage = () => {
    const router = useRouter();

    const { logout, session } = useSession();

    const handleLogout = async () => {
        if (!session) {
            alert('You must be logged in to view this page.');
            return;
        } else {
        const loggingOut = await logoutAuth({session});
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
            <h1 className="text-lg underline">Profile</h1>
        </InnerHeader>
        <MainChild>
            <div className="flex flex-col justify-center space-y-4">
                <button>
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