'use client'

import React, { createContext, useContext } from 'react';

type ContextType = {
  modalOpen: string;
  setModalOpen: React.Dispatch<React.SetStateAction<string>>;
  setColorChoice: React.Dispatch<React.SetStateAction<string>>;
  colorChoice: string | null;
  calDash: boolean;
  setCalDash: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialContext: ContextType = {
  modalOpen: '',
  setModalOpen: () => {},
  //handleSignUpSubmit: (event: React.FormEvent<HTMLFormElement>) => {},
  setColorChoice: () => {},
  colorChoice: '',
  calDash: false,
  setCalDash: () => {},
};

const ModalContext = createContext(initialContext);

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children, modalOpen, setModalOpen, setColorChoice, colorChoice, calDash, setCalDash }: React.PropsWithChildren<{
  modalOpen: string;
  setModalOpen: React.Dispatch<React.SetStateAction<string>>;
  setColorChoice: React.Dispatch<React.SetStateAction<string>>;
  colorChoice: string;
  calDash: boolean, setCalDash: React.Dispatch<React.SetStateAction<boolean>>;

}>) => {

  const value = { modalOpen, setModalOpen, setColorChoice, colorChoice, calDash, setCalDash };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
    )
};