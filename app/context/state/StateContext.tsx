'use client'

import React, { createContext, useContext } from 'react';

type ContextType = {
    urlToUse: string;
    setUrlToUse: React.Dispatch<React.SetStateAction<string>>;
};

const initialContext: ContextType = {
    urlToUse: '',
    setUrlToUse: () => {},
};

const StateContext = createContext(initialContext);

export const useStateContext = () => useContext(StateContext);

export const StateProvider = ({ children, urlToUse, setUrlToUse }: React.PropsWithChildren<{ urlToUse: string, setUrlToUse: React.Dispatch<React.SetStateAction<string>>}>) => {

  const value = { urlToUse, setUrlToUse };

  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
    )
};