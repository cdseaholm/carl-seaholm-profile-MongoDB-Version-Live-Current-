'use client'
import { useRef } from 'react';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    const divRef = useRef(null);
    
    return (
            <div className="childFirst min-w-screen min-h-screen my-10 mx-10">
                <div className='flex bg-white/30 p-3 rounded-md 60 mt-7 mx-2 justify-center max-h-screen' style={{ overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(100, 116, 139, 1) rgba(0, 0, 0, 0.1)'}} ref={divRef}>
                    {children}
                </div>
            </div>
    );
}