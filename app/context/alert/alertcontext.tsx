'use client'

import React, { createContext, useContext } from "react"

type ContextType = {
    showAlert: boolean | null;
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
    setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
    alertMessage: string | null;
    alertParent: string | null;
    setAlertParent: React.Dispatch<React.SetStateAction<string>>;
    alertConfirm: boolean | null;
    setAlertConfirm: React.Dispatch<React.SetStateAction<boolean>>;
    resetAlert: () => void;
};

const initialContext: ContextType = {
    showAlert: false,
    setShowAlert: () => {},
    alertMessage: '',
    setAlertMessage: () => {},
    alertParent: '',
    setAlertParent: () => {},
    alertConfirm: false,
    setAlertConfirm: () => {},
    resetAlert: () => {}
};

const AlertContext = createContext(initialContext);

export const useAlertContext = () => useContext(AlertContext);

export const AlertProvider = ({ children, showAlert, setShowAlert, alertMessage, setAlertMessage, alertParent, setAlertParent, alertConfirm, setAlertConfirm, resetAlert }: React.PropsWithChildren<{
    showAlert: boolean;
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
    alertMessage: string;
    setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
    alertParent: string;
    setAlertParent: React.Dispatch<React.SetStateAction<string>>;
    alertConfirm: boolean;
    setAlertConfirm: React.Dispatch<React.SetStateAction<boolean>>;
    resetAlert: () => void;
}>) => {

  const value = { showAlert, setShowAlert, alertMessage, setAlertMessage, alertParent, setAlertParent, alertConfirm, setAlertConfirm, resetAlert };

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
    )
};
