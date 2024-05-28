import { create } from 'zustand';

interface ModalStore {
    modalOpen: string;
    setModalOpen: (modalOpen: string) => void;
    colorChoice: string | null;
    setColorChoice: (colorChoice: string) => void;
    daySelected: string;
    setDaySelected: (daySelected: string) => void;
    modalParent: string;
    setModalParent: (modalParent: string) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    modalOpen: '',
    setModalOpen: (modalOpen) => set({ modalOpen }),
    colorChoice: '',
    setColorChoice: (colorChoice) => set({ colorChoice }),
    daySelected: '',
    setDaySelected: (daySelected) => set({ daySelected }),
    modalParent: '',
    setModalParent: (modalParent) => set({ modalParent }),
}));