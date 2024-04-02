'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import logout from '@/app/api/auth/logout';

const LogoutPage = () => {
    const router = useRouter();

    const handleLogout = async () => {
        const loggingOut = await logout();
        if (loggingOut === 'Logged out successfully') {
            router.push('/login');
        }
        
    };

    return (
        <div className="flex justify-evenly flex-col items-center space-y-4">
            <div className="flex justify-center">
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default LogoutPage;