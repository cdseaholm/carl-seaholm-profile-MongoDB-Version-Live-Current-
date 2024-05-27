'use client'

import React, { createContext, useContext } from 'react';

type ContextType = {
    urlToUse: string;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialContext: ContextType = {
    urlToUse: process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_BASE_URL !== undefined && process.env.NEXT_PUBLIC_BASE_URL !== '' && process.env.NEXT_PUBLIC_BASE_URL !== null ? process.env.NEXT_PUBLIC_BASE_URL
    : 
    process.env.NODE_ENV === 'production' && process.env. NEXT_PUBLIC_BASE_LIVEURL !== null && process.env.NEXT_PUBLIC_BASE_LIVEURL !== '' && process.env.NEXT_PUBLIC_BASE_LIVEURL !== undefined ? process.env.NEXT_PUBLIC_BASE_LIVEURL 
    : '',
    loading: false,
    setLoading: () => {},
};

const StateContext = createContext(initialContext);

export const useStateContext = () => useContext(StateContext);

export const StateProvider = ({ children, loading, setLoading }: React.PropsWithChildren<{loading: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>>}>) => {

  const value = { urlToUse: process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_BASE_URL !== undefined && process.env.NEXT_PUBLIC_BASE_URL !== '' && process.env.NEXT_PUBLIC_BASE_URL !== null ? process.env.NEXT_PUBLIC_BASE_URL
  :
  process.env.NODE_ENV === 'production' && process.env. NEXT_PUBLIC_BASE_LIVEURL !== null && process.env.NEXT_PUBLIC_BASE_LIVEURL !== '' && process.env.NEXT_PUBLIC_BASE_LIVEURL !== undefined ? process.env.NEXT_PUBLIC_BASE_LIVEURL
  : '',
  loading, setLoading};

  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
    )
};