import { create } from 'zustand';

interface ModalStore {
    modalOpen: string;
    setModalOpen: (modalOpen: string) => void;
    colorChoice: string | null;
    setColorChoice: (colorChoice: string) => void;
    modalParent: string;
    setModalParent: (modalParent: string) => void;
    showCalendar: boolean;
    setShowCalendar: (showCalendar: boolean) => void;
    dashToShow: string;
    setDashToShow: (dashToShow: string) => void;

    logSessionModalOpen: boolean;
    setLogSessionModalOpen: (logSessionModalOpen: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    modalOpen: '',
    setModalOpen: (modalOpen) => set({ modalOpen }),
    colorChoice: '',
    setColorChoice: (colorChoice) => set({ colorChoice }),
    modalParent: '',
    setModalParent: (modalParent) => set({ modalParent }),
    showCalendar: false,
    setShowCalendar: (showCalendar) => set({ showCalendar }),
    dashToShow: 'stats',
    setDashToShow: (dashToShow) => set({ dashToShow }),
    logSessionModalOpen: false,
    setLogSessionModalOpen: (logSessionModalOpen) => set({ logSessionModalOpen })
}));