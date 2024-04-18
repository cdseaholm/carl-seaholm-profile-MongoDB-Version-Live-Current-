'use client'

import { ActualUser } from '@/models/types/user';
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
  userToEdit: ActualUser;
  setUserToEdit: React.Dispatch<React.SetStateAction<ActualUser>>;
  setModalSubscribeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalSubscribeOpen: boolean | null;

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
  userToEdit: {} as ActualUser,
  setUserToEdit: () => {},
  setModalSubscribeOpen: () => {},
  modalSubscribeOpen: false,
};

const ModalContext = createContext(initialContext);

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children, modalOpen, setModalOpen, modalSignUpOpen, setModalSignUpOpen, swapAuthDesire, showAlert, setShowAlert, setAlertMessage, alertMessage, alertParent, setAlertParent, alertConfirm, setAlertConfirm, showEditUser, setShowEditUser, userToEdit, setUserToEdit, setModalSubscribeOpen, modalSubscribeOpen }: React.PropsWithChildren<{
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
  userToEdit: ActualUser;
  setUserToEdit: React.Dispatch<React.SetStateAction<ActualUser>>;
  setModalSubscribeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalSubscribeOpen: boolean;
}>) => {

  const value = { modalOpen, setModalOpen, modalSignUpOpen, setModalSignUpOpen, swapAuthDesire, showAlert, setShowAlert, setAlertMessage, alertMessage, alertParent, setAlertParent, alertConfirm, setAlertConfirm, showEditUser, setShowEditUser, userToEdit, setUserToEdit, setModalSubscribeOpen, modalSubscribeOpen};

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
    )
};