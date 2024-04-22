'use client'

import React, { createContext, useContext } from 'react';

type ContextType = {
  modalOpen: boolean | null;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalSignUpOpen: boolean | null;
  setModalSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  //handleSignUpSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  swapAuthDesire: () => void;
  showAlert: boolean | null;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  alertMessage: string | null;
  alertParent: string | null;
  setAlertParent: React.Dispatch<React.SetStateAction<string>>;
  alertConfirm: boolean | null;
  setAlertConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  showEditUser: boolean | null;
  setShowEditUser: React.Dispatch<React.SetStateAction<boolean>>;
  setModalSubscribeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalSubscribeOpen: boolean | null;
  setColorChoice: React.Dispatch<React.SetStateAction<string>>;
  colorChoice: string | null;
  swapDashDesire: () => void;
};

const initialContext: ContextType = {
  modalOpen: false,
  modalSignUpOpen: false,
  setModalSignUpOpen: () => {},
  setModalOpen: () => {},
  //handleSignUpSubmit: (event: React.FormEvent<HTMLFormElement>) => {},
  swapAuthDesire: () => {},
  showAlert: false,
  setShowAlert: () => {},
  setAlertMessage: () => {},
  alertMessage: '',
  alertParent: '',
  setAlertParent: () => {},
  alertConfirm: false,
  setAlertConfirm: () => {},
  showEditUser: false,
  setShowEditUser: () => {},
  setModalSubscribeOpen: () => {},
  modalSubscribeOpen: false,
  setColorChoice: () => {},
  colorChoice: '',
  swapDashDesire: () => {},
};

const ModalContext = createContext(initialContext);

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children, modalOpen, setModalOpen, modalSignUpOpen, setModalSignUpOpen, swapAuthDesire, showAlert, setShowAlert, setAlertMessage, alertMessage, alertParent, setAlertParent, alertConfirm, setAlertConfirm, showEditUser, setShowEditUser, setModalSubscribeOpen, modalSubscribeOpen, setColorChoice, colorChoice, swapDashDesire }: React.PropsWithChildren<{
  modalOpen: boolean; 
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalSignUpOpen: boolean; 
  setModalSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  //handleSignUpSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  swapAuthDesire: () => void;
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  alertMessage: string;
  alertParent: string;
  setAlertParent: React.Dispatch<React.SetStateAction<string>>
  alertConfirm: boolean;
  setAlertConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  showEditUser: boolean;
  setShowEditUser: React.Dispatch<React.SetStateAction<boolean>>;
  setModalSubscribeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalSubscribeOpen: boolean;
  setColorChoice: React.Dispatch<React.SetStateAction<string>>;
  colorChoice: string;
  swapDashDesire: () => void;
}>) => {

  const value = { modalOpen, setModalOpen, modalSignUpOpen, setModalSignUpOpen, swapAuthDesire, showAlert, setShowAlert, setAlertMessage, alertMessage, alertParent, setAlertParent, alertConfirm, setAlertConfirm, showEditUser, setShowEditUser, setModalSubscribeOpen, modalSubscribeOpen, setColorChoice, colorChoice, swapDashDesire};

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
    )
};