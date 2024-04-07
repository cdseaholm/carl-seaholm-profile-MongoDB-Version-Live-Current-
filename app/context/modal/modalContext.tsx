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
  showAlert: boolean | null;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  alertMessage: string | null;
  alertParent: string | null;
  setAlertParent: React.Dispatch<React.SetStateAction<string>>;
  alertConfirm: boolean | null;
  setAlertConfirm: React.Dispatch<React.SetStateAction<boolean>>;
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
  showAlert: false,
  setShowAlert: () => {},
  setAlertMessage: () => {},
  alertMessage: '',
  alertParent: '',
  setAlertParent: () => {},
  alertConfirm: false,
  setAlertConfirm: () => {},
};

const ModalContext = createContext(initialContext);

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children, modalOpen, setModalOpen, handleLogout, handleSubmit, modalSignUpOpen, setModalSignUpOpen, handleSignUpSubmit, swapAuthDesire, showAlert, setShowAlert, setAlertMessage, alertMessage, alertParent, setAlertParent, alertConfirm, setAlertConfirm }: React.PropsWithChildren<{
  modalOpen: boolean; 
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void; 
  modalSignUpOpen: boolean; 
  setModalSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSignUpSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  swapAuthDesire: () => void;
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  alertMessage: string;
  alertParent: string;
  setAlertParent: React.Dispatch<React.SetStateAction<string>>
  alertConfirm: boolean;
  setAlertConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}>) => {

  const value = { modalOpen, setModalOpen, handleLogout, handleSubmit, modalSignUpOpen, setModalSignUpOpen, handleSignUpSubmit, swapAuthDesire, showAlert, setShowAlert, setAlertMessage, alertMessage, alertParent, setAlertParent, alertConfirm, setAlertConfirm};

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
    )
};