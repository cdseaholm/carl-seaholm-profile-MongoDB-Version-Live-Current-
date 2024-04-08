'use client'

import React, { createContext, useContext } from 'react';
import { Session } from 'lucia';
import { ActualUser } from '@/types/user';

type ContextType = {
    session: Session | null;
    user: ActualUser | null;
    loading: boolean | null;
    logout: () => void;
    setSession: React.Dispatch<React.SetStateAction<Session | null>>;
    setUser: React.Dispatch<React.SetStateAction<ActualUser | null>>;
};

const initialContext: ContextType = {
    session: null,
    user: null,
    loading: true,
    logout: () => {},
    setSession: () => {},
    setUser: () => {},
};

const SessionContext = createContext<ContextType>(initialContext);

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children, session, user, loading, logout, setSession, setUser }: React.PropsWithChildren<{ session: Session | null, user: ActualUser | null, loading: boolean; logout: () => void, setSession: React.Dispatch<React.SetStateAction<Session | null>>, setUser: React.Dispatch<React.SetStateAction<ActualUser | null>> }>) => {
    
    const value = { session, user, loading, logout, setSession, setUser };

    //console.log('SessionProvider value:', value);

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};