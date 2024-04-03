'use client'

import React, { useState } from 'react';
import Image from 'next/image';

export default function Personal() {
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [blurb, setBlurb] = useState(0);
  const hobbies = ['Brazilian Jiu Jitsu', 'Coding', 'Guitar', 'Language Learning', 'Piano', 'Reading', 'Writing'];
  const pets = ['Benji', 'George'];
  const blurbs = [
    'I am a Software Engineer with a passion for learning and improving.',
    'I am currently focusing on improving my JavaScript and TSX applications.',
    'I am learning to site read while playing piano, improving guitar playing, and writing.',
    'I am currently working on a book and a coding project.',
    'I am currently learning Brazilian Jiu Jitsu.',
    'I am currently learning Spanish and Japanese.',
    'I am currently reading "The Way of Kings" by Brandon Sanderson.',
    'I am currently writing a book.',
    'I am currently working on a coding project.'
  ];


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
          <div className='pt-20 flex flex-row justify-between'>
          <div className='flex justify-start w-2/3'>
            {blurbs[blurb]}
          </div>
          <div className='flex flex-col justify-end'>
          <li>
            {hobbies.map((hobby, index) => (
              <div key={index} onClick={() => setBlurb(index)}>
                <li>{hobby}</li>
              </div>
            ))}
            {pets.map((pet, index) => (
              <div key={index} onClick={() => setBlurb(index)}>
                <li>{pet}</li>
              </div>
            ))}
          </li>
          </div>
          </div>
    </main>
  );
}