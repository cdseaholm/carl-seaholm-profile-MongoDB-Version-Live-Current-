'use client'

import React, { createContext, useContext } from 'react';

type ContextType = {
  modalOpen: boolean | null;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalSignUpOpen: boolean | null;
  setModalSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSignUpSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  swapAuthDesire: () => void;
};

const initialContext: ContextType = {
  modalOpen: false,
  modalSignUpOpen: false,
  setModalSignUpOpen: () => {},
  setModalOpen: () => {},
  handleLogout: () => {},
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => {},
  handleSignUpSubmit: (event: React.FormEvent<HTMLFormElement>) => {},
  swapAuthDesire: () => {},
};

const ModalContext = createContext(initialContext);

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children, modalOpen, setModalOpen, handleLogout, handleSubmit, modalSignUpOpen, setModalSignUpOpen, handleSignUpSubmit, swapAuthDesire }: React.PropsWithChildren<{
  modalOpen: boolean; 
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void; 
  modalSignUpOpen: boolean; 
  setModalSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSignUpSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  swapAuthDesire: () => void;
}>) => {

  const value = { modalOpen, setModalOpen, handleLogout, handleSubmit, modalSignUpOpen, setModalSignUpOpen, handleSignUpSubmit, swapAuthDesire };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
    )
};