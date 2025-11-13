import { IRecipe } from '@/models/types/recipe';
import { IUser } from '@/models/types/user';
import { create } from 'zustand';

interface UserStore {
    userInfo: IUser,
    setUserInfo: (userInfo: IUser) => void
    userRecipes: IRecipe[],
    setUserRecipes: (userRecipes: IRecipe[]) => void
    adminIDBool: boolean,
    setAdminIDBool: (adminIDBool: boolean) => void
}

export const useUserStore = create<UserStore>((set) => ({
    userInfo: {} as IUser,
    setUserInfo: (info) => set({ userInfo: info }),
    userRecipes: [] as IRecipe[],
    setUserRecipes: (info) => set({ userRecipes: info }),
    adminIDBool: false,
    setAdminIDBool: (bool) => set({adminIDBool: bool})
}));