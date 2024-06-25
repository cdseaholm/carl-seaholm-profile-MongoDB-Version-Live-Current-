'use client'

import {Providers} from "@/app/providers";
import MotionWrap from '@/components/listeners/motionwrap';
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useStateStore } from "@/context/stateStore";
import Navbar from "../nav/Navbar";
import FooterNavBar from "../nav/footer/footerNavbar";


export default function PageWrapper({children}: Readonly<{children: React.ReactNode;}>) {
    
    const pathname = usePathname();
    const targetRef = useRef<HTMLElement>(null);
    const setWidthQuery = useStateStore((state) => state.setWidthQuery);
    const isDemo = pathname === '/demo_303' ? true : false;

    useEffect(() => {
        if (targetRef.current === null) {
          return;
        } else {
          const newWidth = targetRef.current.offsetWidth;
          setWidthQuery(newWidth);
        }
      
        const updateMedia = () => {
          const innerWidth = window.innerWidth;
          setWidthQuery(innerWidth);
        }
      
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
      }, [setWidthQuery]);



    return (
        <div className="bg-white/50 h-dvh">
          <Providers>
            <MotionWrap motionKey={pathname}>
                <main className={`${isDemo ? 'min-h-screen object-fill bg-gray-800': 'flex flex-col px-2 h-dvh justify-between'}`} ref={targetRef}>
                    {!isDemo && <Navbar />}
                    {children}
                    {!isDemo && <FooterNavBar />}
                </main>
            </MotionWrap>
          </Providers>
        </div>
    )
}