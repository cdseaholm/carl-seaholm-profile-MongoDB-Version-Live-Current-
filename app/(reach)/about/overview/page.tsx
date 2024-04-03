'use client'

import React, { useState } from 'react';
import Image from 'next/image';

export default function OverviewPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const imageClick = () => {
    setIsHovered(!isHovered);
    setClicked(!clicked);
  };

  const style = {
    profilepicture: {
      large: `fixed z-20 top-25 left-10 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`,
      small: `fixed z-20 top-25 left-10 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`
    },
  };

  return (
    <main>
              <Image
                onClick={imageClick}
                priority
                src="/images/carlseaholmimage.jpg"
                className={`${clicked ? style.profilepicture.large : style.profilepicture.small}`}
                height={clicked ? 200 : 100}
                width={clicked ? 200 : 100}
                alt="Carl Seaholm Profile Photo"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
          <h1 className="flex text-6xl font-bold pt-5 pr-5 justify-end">Carl Seaholm</h1>
          <p className="text-2xl pt-5">Constantly learning, improving, and trying something new. Follow along, check out my Coding projects, current book I&apos;m trying to publish and the other that I&apos;m writing.</p>
          <p className="text 2xl pt-5 tp-2">Currently focusing on improving my JavaScript and TSX applications. As well as learning to site read while playing piano, improving guitar playing, and writing.</p>
    </main>
  );
}