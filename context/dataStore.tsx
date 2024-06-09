import {create} from 'zustand';
import { IHobby } from '../models/types/hobby';
import { IRecipe } from '../models/types/recipe';

type Store = {
  hobbies: IHobby[];
  setHobbies: (hobbies: IHobby[]) => void;
  recipes: IRecipe[];
  setRecipes: (recipes: IRecipe[]) => void;
  recipeFilter: string;
  setRecipeFilter: (recipeFilter: string) => void;
};

export const useStore = create<Store>((set) => ({
  hobbies: [],
  setHobbies: (hobbies) => set({ hobbies }),
  recipes: [],
  setRecipes: (recipes) => set({ recipes }),
  recipeFilter: '',
  setRecipeFilter: (recipeFilter) => set({ recipeFilter }),
}));