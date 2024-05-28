import { create } from 'zustand';

interface AlertStore {
    showAlert: boolean;
    setShowAlert: (showAlert: boolean) => void;
    alertMessage: string;
    setAlertMessage: (alertMessage: string) => void;
    alertParent: string;
    setAlertParent: (alertParent: string) => void;
    alertFirstButton: boolean;
    setAlarmFirstButton: (alertFirstButton: boolean) => void;
    alertSecondButton: boolean;
    setAlarmSecondButton: (alertSecondButton: boolean) => void;
    resetAlert: () => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
    showAlert: false,
    setShowAlert: (showAlert) => set({ showAlert }),
    alertMessage: '',
    setAlertMessage: (alertMessage) => set({ alertMessage }),
    alertParent: '',
    setAlertParent: (alertParent) => set({ alertParent }),
    alertFirstButton: false,
    setAlarmFirstButton: (alertFirstButton) => set({ alertFirstButton }),
    alertSecondButton: false,
    setAlarmSecondButton: (alertSecondButton) => set({ alertSecondButton }),
    resetAlert: () => set({ showAlert: false, alertMessage: '', alertParent: '', alertFirstButton: false, alertSecondButton: false})
}));