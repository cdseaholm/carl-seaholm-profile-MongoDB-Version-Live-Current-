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
  setHobbies: React.Dispatch<React.SetStateAction<IHobby[]>>;
  hobbies: IHobby[];
  setDaySelected: React.Dispatch<React.SetStateAction<string>>;
  daySelected: string;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  tasks: ITask[];
};

const initialContext: ContextType = {
  modalOpen: '',
  setModalOpen: () => {},
  //handleSignUpSubmit: (event: React.FormEvent<HTMLFormElement>) => {},
  setColorChoice: () => {},
  colorChoice: '',
  setHobbies: () => {},
  hobbies: [] as IHobby[],
  setDaySelected: () => {},
  daySelected: '',
  setTasks: () => {},
  tasks: [] as ITask[],
};

const ModalContext = createContext(initialContext);

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children, modalOpen, setModalOpen, setColorChoice, colorChoice, hobbies, setHobbies, setDaySelected, daySelected, tasks, setTasks }: React.PropsWithChildren<{
  modalOpen: string;
  setModalOpen: React.Dispatch<React.SetStateAction<string>>;
  setColorChoice: React.Dispatch<React.SetStateAction<string>>;
  colorChoice: string;
  setHobbies: React.Dispatch<React.SetStateAction<IHobby[]>>, 
  hobbies: IHobby[],
  setDaySelected: React.Dispatch<React.SetStateAction<string>>, 
  daySelected: string,
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>,
  tasks: ITask[],

}>) => {

  const value = { modalOpen, setModalOpen, setColorChoice, colorChoice, hobbies, setHobbies, setDaySelected, daySelected, setTasks, tasks};

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
    )
};