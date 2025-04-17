import { IHobby } from '@/models/types/hobby';
import { IRecipe } from '@/models/types/recipe';
import { IUser } from '@/models/types/user';
import { create } from 'zustand';

interface UserStore {
    userInfo: IUser,
    setUserInfo: (userInfo: IUser) => void
    userRecipes: IRecipe[],
    setUserRecipes: (userRecipes: IRecipe[]) => void
    userHobbies: IHobby[],
    setUserHobbies: (userHobbies: IHobby[]) => void,
    adminIDBool: boolean,
    setAdminIDBool: (adminIDBool: boolean) => void
}

export const useUserStore = create<UserStore>((set) => ({
    userInfo: {} as IUser,
    setUserInfo: (info) => set({ userInfo: info }),
    userRecipes: [] as IRecipe[],
    setUserRecipes: (info) => set({ userRecipes: info }),
    userHobbies: [] as IHobby[],
    setUserHobbies: (info) => set({ userHobbies: info }),
    adminIDBool: false,
    setAdminIDBool: (bool) => set({adminIDBool: bool})
}));