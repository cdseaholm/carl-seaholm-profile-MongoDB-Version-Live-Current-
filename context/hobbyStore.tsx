import { create } from 'zustand';
import { IHobby } from '../models/types/hobby';

interface HobbyStore {
    filterItem: string;
    setFilterItem: (filterItem: string) => void;
    categoryPassed: string;
    setCategoryPassed: (categoryPassed: string) => void;
    openCategoryModal: boolean;
    setOpenCategoryModal: (openCategoryModal: boolean) => void;
    refreshKey: number;
    setRefreshKey: (updateFunction: (refreshKey: number) => number) => void;
    hobbyToShow: IHobby[];
    setHobbyToShow: (hobbyToShow: IHobby[]) => void;
    categories: string[];
    setCategories: (categories: string[]) => void;
    titles: string[];
    setTitles: (titles: string[]) => void;
}

export const useHobbyStore = create<HobbyStore>((set) => ({
    filterItem: '',
    setFilterItem: (filterItem) => set({ filterItem }),
    categoryPassed: '',
    setCategoryPassed: (categoryPassed) => set({ categoryPassed }),
    openCategoryModal: false,
    setOpenCategoryModal: (openCategoryModal) => set({ openCategoryModal }),
    refreshKey: 0,
    setRefreshKey: (updateFunction) => set((state) => ({ refreshKey: updateFunction(state.refreshKey) })),
    hobbyToShow: [],
    setHobbyToShow: (hobbyToShow) => set({ hobbyToShow }),
    categories: [] as string[],
    setCategories: (categories) => set({ categories }),
    titles: [] as string[],
    setTitles: (titles) => set({ titles })
}));