import { create } from 'zustand';


interface StateStore {
    urlToUse: string;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    dashToShow: string;
    setDashToShow: (dashToShow: string) => void;
}

export const useStateStore = create<StateStore>((set) => ({
    urlToUse: process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_BASE_URL !== undefined && process.env.NEXT_PUBLIC_BASE_URL !== '' && process.env.NEXT_PUBLIC_BASE_URL !== null ? process.env.NEXT_PUBLIC_BASE_URL
    : 
    process.env.NODE_ENV === 'production' && process.env. NEXT_PUBLIC_BASE_LIVEURL !== null && process.env.NEXT_PUBLIC_BASE_LIVEURL !== '' && process.env.NEXT_PUBLIC_BASE_LIVEURL !== undefined ? process.env.NEXT_PUBLIC_BASE_LIVEURL 
    : '',
    loading: false,
    setLoading: (loading) => set({loading}),
    dashToShow: 'stats',
    setDashToShow: (dashToShow) => set({dashToShow}),
}));