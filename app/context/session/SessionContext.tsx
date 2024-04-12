'use client'

import React, { createContext, useContext } from 'react';
import { ActualUser } from '@/types/user';

type ContextType = {
    user: ActualUser | null;
    logout: () => void;
    getSession: () => void; // add the getSession function
    setUser: React.Dispatch<React.SetStateAction<ActualUser | null>>;
    connectionState?: boolean;
    setConnectionState?: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialContext: ContextType = {
    user: null,
    logout: () => {},
    getSession: () => {},
    setUser: () => {},
    connectionState: false,
    setConnectionState: () => {},
};

const SessionContext = createContext<ContextType>(initialContext);

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children, logout, getSession, setUser, user, connectionState, setConnectionState }: React.PropsWithChildren<{ logout: () => void, getSession: () => void, setUser: React.Dispatch<React.SetStateAction<ActualUser | null>>, user: ActualUser | null, connectionState: boolean, setConnectionState: React.Dispatch<React.SetStateAction<boolean>> }>) => {
    
    const value = { logout, getSession, setUser, user, connectionState, setConnectionState};

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};