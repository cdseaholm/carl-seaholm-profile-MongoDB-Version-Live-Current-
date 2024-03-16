'use client'

import React, { useState } from 'react';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <main>
      <div className="flex justify-evenly pt-10">
        <div className='w-2/6 flex-col text-right justify-items-right' style={{paddingLeft: clicked ? 14 : 0}}>
          <p className="text-2xl pt-5">Constantly learning, improving, and trying something new. Follow along, check out my Coding projects, current book I&apos;m trying to publish and the other that I&apos;m writing.</p>
          <p className="text 2xl pt-5 tp-2 text-black">Currently focusing on improving my JavaScript and TSX applications. As well as learning to site read while playing piano, improving guitar playing, and writing.</p>
        </div>
      </div>
    </main>
  );
}