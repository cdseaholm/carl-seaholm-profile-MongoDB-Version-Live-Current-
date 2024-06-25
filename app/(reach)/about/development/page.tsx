'use client'

import React from 'react';
import DevelopmentDesktop from '@/app/(reach)/about/development/desktop';
import DevelopmentMobile from '@/app/(reach)/about/development//mobile';
import { useStateStore } from '@/context/stateStore';


export default function Development() {
  
  const isBreakpoint = useStateStore((state) => state.widthQuery) < 768 ? true : false;

  return (
    <main>
      <div className="childFirst min-w-screen min-h-screen my-10 mx-10">
        {!isBreakpoint &&
        <DevelopmentDesktop />
        }
        {isBreakpoint &&
        <DevelopmentMobile />
        }

      </div>
    </main>
  );
}