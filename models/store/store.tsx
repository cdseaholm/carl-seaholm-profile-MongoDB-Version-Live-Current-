import {create} from 'zustand';

type Store = {
  tasks: any[];
  hobbies: any[];
  setTasks: (tasks: any[]) => void;
  setHobbies: (hobbies: any[]) => void;
};

export const useStore = create<Store>((set) => ({
  tasks: [],
  hobbies: [],
  setTasks: (tasks) => set({ tasks }),
  setHobbies: (hobbies) => set({ hobbies }),
}));