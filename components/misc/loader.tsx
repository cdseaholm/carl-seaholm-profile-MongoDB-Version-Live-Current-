'use client'

import { useStateStore } from "@/context/stateStore";
import { useRef, useEffect } from "react";
import MainPageBody from "../pagetemplates/mainpagebody/mainpagebody";

export default function Loader({ children }: { children: React.ReactNode }) {

    const init = useRef(false);
    const setGlobalLoading = useStateStore(state => state.setGlobalLoading);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }

        if (!init.current) {
            init.current = true;
            setGlobalLoading(false);
        }
    }, [setGlobalLoading]);

    return (
        <MainPageBody>
            {children}
        </MainPageBody>
    );
}