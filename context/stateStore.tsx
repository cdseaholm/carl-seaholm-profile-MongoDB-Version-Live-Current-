
import { IEntry } from '@/models/old/types/entry';
import { create } from 'zustand';


interface StateStore {
    urlToUse: string;
    setUrlToUse: (url: string) => void;
    globalLoading: boolean;
    setGlobalLoading: (globalLoading: boolean) => void;
    taskDetailToShow: IEntry;
    setTaskDetailToShow: (taskDetailToShow: IEntry) => void;
    overlay: boolean;
    setOverlay: (overlay: boolean) => void;
}

export const useStateStore = create<StateStore>((set) => ({
    urlToUse: '',
    setUrlToUse: (url) => set({ urlToUse: url }),
    globalLoading: false,
    setGlobalLoading: (globalLoading) => set({ globalLoading }),
    taskDetailToShow: {} as IEntry,
    setTaskDetailToShow: (taskDetailToShow) => set({ taskDetailToShow }),
    overlay: false,
    setOverlay: (overlay) => set({ overlay }),
}));