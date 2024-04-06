{/**

'use client'

import React, { createContext, useContext, useState } from 'react';
import { useSession } from './SessionContext';

type ContextType = {
  modalOpen: boolean | null;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
  logout: () => void;
  login: () => (event: React.FormEvent) => void;
};

const initialContext: ContextType = {
  modalOpen: null,
  setModalOpen: () => {},
  logout: () => {},
  login: () => (event: React.FormEvent) => {},
};

const ModalContext = createContext(initialContext);

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const { setSession, setUser, user, session } = useSession();
    const [modalOpen, setModalOpen] = useState<boolean | null>(false);
    //const logout = () => {  logout logic  };
    const login = async () => (event: React.FormEvent) => { async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('handleSubmit function called');
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (user || user && session) {
        alert('You are already logged in');
        return;
    }
    const loggedin = await login({ formData });

    if (typeof loggedin === 'string') {
        alert(loggedin);
        console.log(loggedin);
    } else if (typeof loggedin === 'string' && loggedin === 'Password is incorrect') {
        console.log('incorrectPW', loggedin);
        alert('Password is incorrect');
    } else {
        setSession(loggedin.session);
        setUser(loggedin.user);
        router.push("/dashboard");
    }
  };

  const value = { modalOpen, setModalOpen, logout, login };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};
    
    const value = { modalOpen, setModalOpen, logout, login };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
}; */}