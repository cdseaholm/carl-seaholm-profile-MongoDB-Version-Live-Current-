'use client'

import React, { useEffect, useState } from 'react';
import useMediaQuery from '@/components/listeners/WidthSettings';
import ProfessionalDesktop from './desktop';
import ProfessionalMobile from './mobile';

export default function Professional() {

  const isBreakpoint = useMediaQuery(768);

  useEffect(() => {
      // Disable scrolling on the body when the component is mounted
      document.body.style.overflow = 'hidden';

      // Enable scrolling on the body when the component is unmounted
      return () => {
          document.body.style.overflow = 'unset';
      };
  }, []);

  return (
    <main>
      <div className="childFirstPro min-content mt-10 mx-10">
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