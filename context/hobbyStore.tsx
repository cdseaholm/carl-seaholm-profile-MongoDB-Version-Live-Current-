import { create } from 'zustand';
import { IHobby } from '../models/types/hobby';
import { dataType } from '@/components/pagecomponents/dashboard/statsView';
import { IUserObjectIndexed } from '@/models/types/userObjectIndexed';
import { IFieldObject } from '@/models/types/field';
import { IEntry, IIndexedEntry } from '@/models/types/entry';
import { ColorMapType } from '@/models/types/colorMap';

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
    dashToShow: string;
    setDashToShow: (dashToShow: string) => void;
    dayData: dataType[],
    setDayData: (dayData: dataType[]) => void;

    categories: string[];
    setCategories: (categories: string[]) => void;
    titles: string[];
    setTitles: (titles: string[]) => void;
    userHobbies: IHobby[],
    setUserHobbies: (userHobbies: IHobby[]) => void,
    userObjectsIndexed: IUserObjectIndexed[],
    setUserObjectsIndexed: (userObjectsIndexed: IUserObjectIndexed[]) => void,
    fieldObjects: IFieldObject[],
    setFieldObjects: (fieldObjects: IFieldObject[]) => void,
    hobbyEntries: IEntry[],
    setHobbyEntries: (hobbyEntries: IEntry[]) => void,
    sessionsIndexed: IIndexedEntry[],
    setSessionsIndexed: (sessionsIndexed: IIndexedEntry[]) => void,
    colorMap: ColorMapType[],
    setColorMap: (colorMap: ColorMapType[]) => void,
    totalTimePastFiveMonths: number[],
    setTotalTimePastFiveMonths: (totalTimePastFiveMonths: number[]) => void,
    counterPerPastFiveMonths: number[],
    setCounterPerPastFiveMonths: (counterPerPastFiveMonths: number[]) => void
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
    dashToShow: 'stats',
    setDashToShow: (dashToShow) => set({ dashToShow }),
    dayData: [] as dataType[],
    setDayData: (data: dataType[]) => set({ dayData: data }),

    categories: [] as string[],
    setCategories: (categories) => set({ categories }),
    titles: [] as string[],
    setTitles: (titles) => set({ titles }),
    userHobbies: [] as IHobby[],
    setUserHobbies: (info) => set({ userHobbies: info }),
    userObjectsIndexed: [] as IUserObjectIndexed[],
    setUserObjectsIndexed: (objectsIndexed) => set({ userObjectsIndexed: objectsIndexed }),
    fieldObjects: [] as IFieldObject[],
    setFieldObjects: (objects: IFieldObject[]) => set({ fieldObjects: objects }),
    hobbyEntries: [] as IEntry[],
    setHobbyEntries: (entries: IEntry[]) => set({ hobbyEntries: entries }),
    sessionsIndexed: [] as IIndexedEntry[],
    setSessionsIndexed: (sessions: IIndexedEntry[]) => set({ sessionsIndexed: sessions }),
    colorMap: [] as ColorMapType[],
    setColorMap: (map: ColorMapType[]) => set({ colorMap: map }),
    totalTimePastFiveMonths: [] as number[],
    setTotalTimePastFiveMonths: (totalTime: number[]) => set({ totalTimePastFiveMonths: totalTime }),
    counterPerPastFiveMonths: [] as number[],
    setCounterPerPastFiveMonths: (counter: number[]) => set({ counterPerPastFiveMonths: counter })
}));