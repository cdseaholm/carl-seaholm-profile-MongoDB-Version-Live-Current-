'use client'
import useMediaQuery from '@/components/listeners/WidthSettings';
import { useRef } from 'react';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    const divRef = useRef(null);
    const isBreakpoint = useMediaQuery(768);
    
    return (
        <div className={`childFirst ${isBreakpoint ? 'my-4 py-2 mx-8 px-2' : 'mb-8 py-2 mx-20 px-2'}`}>
                    {children}
        </div>
    );
}