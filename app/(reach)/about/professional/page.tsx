'use client'

import React, { useEffect, useState } from 'react';
import useMediaQuery from '@/components/listeners/WidthSettings';
import ProfessionalDesktop from './desktop';
import ProfessionalMobile from './mobile';

export default function Professional() {

  const isBreakpoint = useMediaQuery(768);

  return (
    <main>
      <div className={`childFirst ${isBreakpoint ? 'my-4 py-2 mx-8 px-2' : 'mb-4 py-2 mx-20 px-2'}`}>
        {!isBreakpoint &&
        <ProfessionalDesktop />
        }
        {isBreakpoint &&
        <ProfessionalMobile />
        }

      </div>
    </main>
  );
}