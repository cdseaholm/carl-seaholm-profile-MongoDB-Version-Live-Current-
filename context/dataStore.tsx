import {create} from 'zustand';
import { IHobby } from '../models/types/hobby';
import { ITask } from '../models/types/task';
import { IRecipe } from '../models/types/recipe';

type Store = {
  tasks: ITask[];
  setTasks: (tasks: ITask[]) => void;
  hobbies: IHobby[];
  setHobbies: (hobbies: IHobby[]) => void;
  adminID: boolean;
  setAdminID: (adminID: boolean) => void;
  recipes: IRecipe[];
  setRecipes: (recipes: IRecipe[]) => void;
  recipeFilter: string;
  setRecipeFilter: (recipeFilter: string) => void;
};

export const useStore = create<Store>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  hobbies: [],
  setHobbies: (hobbies) => set({ hobbies }),
  adminID: false,
  setAdminID: (adminID) => set({ adminID }),
  recipes: [],
  setRecipes: (recipes) => set({ recipes }),
  recipeFilter: '',
  setRecipeFilter: (recipeFilter) => set({ recipeFilter }),
}));