import {create} from 'zustand';
import { IHobby } from '../models/types/hobby';
import { IRecipe } from '../models/types/recipe';
import { IUser } from '@/models/types/user';

type Store = {
  hobbies: IHobby[];
  setHobbies: (hobbies: IHobby[]) => void;
  recipes: IRecipe[];
  setRecipes: (recipes: IRecipe[]) => void;
  recipeFilter: string;
  setRecipeFilter: (recipeFilter: string) => void;
  userInfo: IUser;
  setUserInfo: (userInfo: IUser) => void;
};

export const useStore = create<Store>((set) => ({
  hobbies: [],
  setHobbies: (hobbies) => set({ hobbies }),
  recipes: [],
  setRecipes: (recipes) => set({ recipes }),
  recipeFilter: '',
  setRecipeFilter: (recipeFilter) => set({ recipeFilter }),
  userInfo: {} as IUser,
  setUserInfo: (userInfo) => set({ userInfo })
}));