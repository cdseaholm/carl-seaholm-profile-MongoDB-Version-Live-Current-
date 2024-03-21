'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { DropdownPage } from '@/components/dropdown/dropdown';
import professionalView from '../../../../components/professionalComponents/professionaView';
import useMediaQuery from '@/components/listeners/WidthSettings';
import ProfessionalDesktop from './desktop';
import ProfessionalMobile from './mobile';

const openInNewTab = (url: string) => {
  const win = window.open(url, '_blank');
  win?.focus();
};

export default function Professional() {
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [category, setCategory] = useState('Timeline');
  const isBreakpoint = useMediaQuery(768);

  const imageClick = () => {
    setIsHovered(!isHovered);
    setClicked(!clicked);
  };

  const style = {
    profilepicture: {
      large: `absolute z-20 top-25 left-10 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`,
      small: `absolute z-20 top-25 left-10 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`
    },
  };

  const categories = [
    { name: 'Timeline' },
    { name: 'Developing' },
    { name: 'Management' },
    { name: 'Sales' },
  ];

  return (
    <main>
      <div className="childFirst min-w-screen min-h-screen my-10 mx-10">
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