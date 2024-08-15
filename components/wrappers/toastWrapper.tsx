'use client'

import { useAlertStore } from "@/context/alertStore";
import { toasty } from "@/models/types/toasty";
import { Toaster, toast } from "sonner";

export default function ToastWrapper({children}: Readonly<{children: React.ReactNode}>) {
    const showToast = useAlertStore(state => state.showToast) as toasty;
    const setShowToast = useAlertStore(state => state.setShowToast);
    if (showToast.type === 'success') {
        toast.success(showToast.message);
        setTimeout(() => {
            setShowToast({type: '', message: ''});
        }, 5000);
    } else if (showToast.type === 'error') {
        toast.error(showToast.message);
        setTimeout(() => {
            setShowToast({type: '', message: ''});
        }, 5000);
    } else if (showToast.type === 'warning') {
        toast.warning(showToast.message);
        setTimeout(() => {
            setShowToast({type: '', message: ''});
        }, 5000);
    } else if (showToast.type === 'info') {
        toast.info(showToast.message);
        setTimeout(() => {
            setShowToast({type: '', message: ''});
        }, 5000);
    }

    return (
        <div className={`flex flex-col items-center w-full h-full`}>
            <Toaster position="bottom-right" closeButton richColors/>
            {children}
        </div>
    );
}