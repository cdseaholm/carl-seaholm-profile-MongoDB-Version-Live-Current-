'use client'

import { IRecipe } from '@/models/types/recipe';
import React, { createContext, useContext } from 'react';

type ContextType = {
    filterItem: string;
    setFilterItem: React.Dispatch<React.SetStateAction<string>>;
    recipes: IRecipe[];
    setRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>;
};

//wrap these into one function maybe

const initialContext: ContextType = {
    filterItem: '',
    setFilterItem: () => {},
    recipes: [] as IRecipe[],
    setRecipes: () => {},
};

const RecipeContext = createContext<ContextType>(initialContext);

export const useRecipeContext = () => useContext(RecipeContext);

export const RecipeProvider = ({ children, filterItem, setFilterItem, recipes, setRecipes }: React.PropsWithChildren<{ 
    
    filterItem: string; 
    setFilterItem: React.Dispatch<React.SetStateAction<string>>, 
    recipes: IRecipe[], 
    setRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>> }>) => {
    
    const value = { filterItem, setFilterItem, recipes, setRecipes };

    return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
};