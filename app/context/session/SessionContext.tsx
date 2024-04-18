'use client'

import { Session } from '@/models/types/session';
import { ActualUser } from '@/models/types/user';
import React, { createContext, useContext } from 'react';

type ContextType = {
    user: ActualUser | null;
    setUser: React.Dispatch<React.SetStateAction<ActualUser | null>>;
    logout: () => void;
    connectionState?: boolean;
    setConnectionState?: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialContext: ContextType = {
    user: null,
    setUser: () => {},
    logout: () => {},
    connectionState: false,
    setConnectionState: () => {},
};

const SessionContext = createContext<ContextType>(initialContext);

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children, logout, connectionState, setConnectionState, setUser, user }: React.PropsWithChildren<{ logout: () => void, connectionState: boolean, setConnectionState: React.Dispatch<React.SetStateAction<boolean>>, setUser: React.Dispatch<React.SetStateAction<ActualUser | null>>, user: ActualUser | null}>) => {
    
    const value = { logout, connectionState, setConnectionState, setUser, user};

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};  