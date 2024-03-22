'use client'

import React, { useState } from 'react';
import useMediaQuery from '@/components/listeners/WidthSettings';
import DevelopmentDesktop from './desktop';
import DevelopmentMobile from './mobile';


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