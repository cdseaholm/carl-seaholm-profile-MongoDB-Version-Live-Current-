'use client'

import { IHobby } from '@/models/types/hobby';
import { ITask } from '@/models/types/task';
import { set } from 'mongoose';
import React, { createContext, useContext } from 'react';

type ContextType = {
  modalOpen: string;
  setModalOpen: React.Dispatch<React.SetStateAction<string>>;
  setColorChoice: React.Dispatch<React.SetStateAction<string>>;
  colorChoice: string | null;
  setDaySelected: React.Dispatch<React.SetStateAction<string>>;
  daySelected: string;
};

const initialContext: ContextType = {
  modalOpen: '',
  setModalOpen: () => {},
  //handleSignUpSubmit: (event: React.FormEvent<HTMLFormElement>) => {},
  setColorChoice: () => {},
  colorChoice: '',
  setDaySelected: () => {},
  daySelected: '',
};

const ModalContext = createContext(initialContext);

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children, modalOpen, setModalOpen, setColorChoice, colorChoice, setDaySelected, daySelected }: React.PropsWithChildren<{
  modalOpen: string;
  setModalOpen: React.Dispatch<React.SetStateAction<string>>;
  setColorChoice: React.Dispatch<React.SetStateAction<string>>;
  colorChoice: string;
  setDaySelected: React.Dispatch<React.SetStateAction<string>>, 
  daySelected: string,

}>) => {

  const value = { modalOpen, setModalOpen, setColorChoice, colorChoice, setDaySelected, daySelected};

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
    )
};