import {create} from 'zustand';
import { IUser } from '@/models/types/user';
import { IUserObject } from '@/models/types/userObject';

type Store = {
  userInfo: IUser;
  setUserInfo: (userInfo: IUser) => void;
  userObjects: IUserObject[];
  setUserObjects: (userObjects: IUserObject[]) => void;
  globalObjectToUse: IUserObject | null;
  setGlobalObjectToUse: (globalObjectToUse: IUserObject) => void;
};

export const useStore = create<Store>((set) => ({
  userInfo: {} as IUser,
  setUserInfo: (userInfo) => set({ userInfo }),
  userObjects: [] as IUserObject[],
  setUserObjects: (userObjects) => set({ userObjects }),
  globalObjectToUse: null,
  setGlobalObjectToUse: (globalObjectToUse) => set({ globalObjectToUse }),
}));