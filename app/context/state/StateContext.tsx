'use client'

import React, { createContext, useContext } from 'react';

type ContextType = {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    urlToUse: string;
    setUrlToUse: React.Dispatch<React.SetStateAction<string>>;
};

const initialContext: ContextType = {
    loading: false,
    setLoading: () => {},
    urlToUse: '',
    setUrlToUse: () => {},
};

const StateContext = createContext(initialContext);

export const useStateContext = () => useContext(StateContext);

export const StateProvider = ({ children, loading, setLoading, urlToUse, setUrlToUse }: React.PropsWithChildren<{loading: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>>, urlToUse: string, setUrlToUse: React.Dispatch<React.SetStateAction<string>>}>) => {

  const value = { loading, setLoading, urlToUse, setUrlToUse };

  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
    )
};