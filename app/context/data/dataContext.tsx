'use client'

import { IUser } from '@/models/types/user';
import React, { createContext, useContext, ReactNode } from 'react';

interface DataContextProps {
  data: IUser;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children, data }: { children: ReactNode; data: any }) => {
  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
};