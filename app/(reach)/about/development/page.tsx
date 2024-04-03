'use client'

import React from 'react';
import useMediaQuery from '@/components/listeners/WidthSettings';
import DevelopmentDesktop from '@/app/(reach)/about/development/desktop';
import DevelopmentMobile from '@/app/(reach)/about/development//mobile';


export default function Development() {
  const isBreakpoint = useMediaQuery(768);

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