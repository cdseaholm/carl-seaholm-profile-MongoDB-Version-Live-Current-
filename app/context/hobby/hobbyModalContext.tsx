'use client'

import { IHobby } from '@/models/types/hobby';
import React, { createContext, useContext } from 'react';

type ContextType = {
    filterItem: string;
    setFilterItem: React.Dispatch<React.SetStateAction<string>>;
    categoryPassed: string;
    setCategoryPassed: React.Dispatch<React.SetStateAction<string>>;
    openCategoryModal: boolean;
    setOpenCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
    refreshKey: number;
    setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
    hobbyToShow: IHobby[] | null;
    setHobbyToShow: React.Dispatch<React.SetStateAction<IHobby[] | null>>;
    categories: string[];
    setCategories: React.Dispatch<React.SetStateAction<string[]>>;
    titles: string[];
    setTitles: React.Dispatch<React.SetStateAction<string[]>>;
};

//wrap these into one function maybe

const initialContext: ContextType = {
    filterItem: '',
    setFilterItem: () => {},
    categoryPassed: '',
    setCategoryPassed: () => {},
    openCategoryModal: false,
    setOpenCategoryModal: () => {},
    refreshKey: 0,
    setRefreshKey: () => {},
    hobbyToShow: null,
    setHobbyToShow: () => {},
    categories: [] as string[],
    setCategories: () => {},
    titles: [] as string[],
    setTitles: () => {}
};

const HobbyContext = createContext<ContextType>(initialContext);

export const useHobbyContext = () => useContext(HobbyContext);

export const HobbyProvider = ({ children, filterItem, setFilterItem, categoryPassed, setCategoryPassed, openCategoryModal, setOpenCategoryModal, refreshKey, setRefreshKey, setHobbyToShow, hobbyToShow, categories, setCategories, titles, setTitles }: React.PropsWithChildren<{ 
    
    filterItem: string; 
    setFilterItem: React.Dispatch<React.SetStateAction<string>>, 
    categoryPassed: string, 
    setCategoryPassed: React.Dispatch<React.SetStateAction<string>>, 
    openCategoryModal: boolean, 
    setOpenCategoryModal: React.Dispatch<React.SetStateAction<boolean>>,
    setRefreshKey: React.Dispatch<React.SetStateAction<number>>, 
    refreshKey: number, 
    hobbyToShow: IHobby[] | null, 
    setHobbyToShow: React.Dispatch<React.SetStateAction<IHobby[] | null>>, 
    categories: string[], 
    titles: string[],
    setTitles: React.Dispatch<React.SetStateAction<string[]>>,
    setCategories: React.Dispatch<React.SetStateAction<string[]>> }>) => {
    
    const value = { filterItem, setFilterItem, categoryPassed, setCategoryPassed, openCategoryModal, setOpenCategoryModal, refreshKey, setRefreshKey, setHobbyToShow, hobbyToShow, categories, setCategories, titles, setTitles};

    return <HobbyContext.Provider value={value}>{children}</HobbyContext.Provider>;
};