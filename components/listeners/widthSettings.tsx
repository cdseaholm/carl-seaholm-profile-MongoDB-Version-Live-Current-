import { useStateStore } from "@/context/stateStore";
import { useState, useRef, useEffect } from "react";

export const useObserveElementWidth = <T extends HTMLElement>() => {
    const [width, setWidth] = useState(0);
    const setWidthQuery = useStateStore((state) => state.setWidthQuery);
    const ref = useRef<T>(null);

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0] as ResizeObserverEntry;
            setWidth(entry.contentRect.width);
            setWidthQuery(entry.contentRect.width);
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            ref.current && observer.unobserve(ref.current);
        };
    }, []);

    return {
        width,
        ref
    };
};