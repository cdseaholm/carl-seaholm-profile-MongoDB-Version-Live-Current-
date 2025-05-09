import {create} from 'zustand';
import { Detail } from '@/models/types/detail';

type LifeAspectStore = {
    openLifeAspectModal: string;
    setOpenLifeAspectModal: (openLifeAspectModal: string) => void;
    lifeAspectParent: string;
    setLifeAspectParent: (lifeAspectParent: string) => void;
    lifeAspectName: string;
    setLifeAspectName: (lifeAspectName: string) => void;
    lifeAspectDetails: Detail[];
    setLifeAspectDetails: (lifeAspectDetails: Detail[]) => void;
    lifeDetailName: string;
    setLifeDetailName: (lifeDetailName: string) => void;
    lifeDetailType: string;
    setLifeDetailType: (lifeDetailType: string) => void;
    addLifeAspectDetailBool: boolean;
    setAddLifeAspectDetailBool: (addLifeAspectDetailBool: boolean) => void;
};

export const useLifeAspectStore = create<LifeAspectStore>((set) => ({
    openLifeAspectModal: '',
    setOpenLifeAspectModal: (openLifeAspectModal) => set({ openLifeAspectModal }),
    lifeAspectParent: '',
    setLifeAspectParent: (lifeAspectParent) => set({ lifeAspectParent }),
    lifeAspectName: '',
    setLifeAspectName: (lifeAspectName) => set({ lifeAspectName }),
    lifeAspectDetails: [],
    setLifeAspectDetails: (lifeAspectDetails) => set({ lifeAspectDetails }),
    lifeDetailName: '',
    setLifeDetailName: (lifeDetailName) => set({ lifeDetailName }),
    lifeDetailType: '',
    setLifeDetailType: (lifeDetailType) => set({ lifeDetailType }),
    addLifeAspectDetailBool: false,
    setAddLifeAspectDetailBool: (addLifeAspectDetailBool) => set({ addLifeAspectDetailBool })
}));