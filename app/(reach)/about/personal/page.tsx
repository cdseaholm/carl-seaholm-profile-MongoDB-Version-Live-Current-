'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import useMediaQuery from '@/components/listeners/WidthSettings';
import MainChild from '@/components/pagetemplates/mainchild/mainchild';

export default function Personal() {
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [blurb, setBlurb] = useState(0);
  const isBreakpoint = useMediaQuery(768);
  const hobbies = ['Brazilian Jiu Jitsu', 'Coding', 'Guitar', 'Language Learning', 'Piano', 'Reading', 'Writing'];
  const pets = ['Benji', 'George'];
  const blurbs = [
    'My name is Carl Seaholm. I am a software engineer, writer, and musician. I am currently working on building a path for myself in the Development world. I have a strong passion for development, fitness, and overall self-improvement. Click on any of the hobbies or pets on the right to learn more.',
    'Currently a purple belt, I relish the challenges that comes with Jiu Jitsu and the lessions it teaches me. I hope to some day be a blackbelt.',
    'I am currently focusing on improving my JavaScript and TSX applications, as well as working on updating clients websites to be a bit more updated and fresh. I am also currently working on a coding project that will hopefully unite a professional and personal experience for those that want to enhance their hireability, improve outreach for their hobbies, or stay conneted with close ones.',
    'When it comes to guitar playing, I am working on my music theory and how it applies to jazz chords, triads, and fingerstyle techniques.',
    'I am currently learning Spanish, Japanese, and Mandarin. I have dabbled in Latin. And I am a bit more advanced in Italian.',
    'I am learning to site read while playing piano.',
    'I am currently reading "The Burning God" by R.F. Kuang',
    'I am polishing my first novel as well as submitting to agencies for my first publication. As well as I have begun to write my second book which should be the first in a series.',
    'Benji is a 1 year old Bengal Cat. He is very sweet, loving, and is an overall playful cat. He tends to enjoy being alone from time from time to time, but he is very good with guests. He is a very good cat to have around.',
    "George is a 6 months old Bengal Cat. He is much more wild and crazy than his brother Benjamin. Both share the same dad so they have taken to eachother very well. George is very playful. He loves to cuddle and has a great purr. You'll find he has no issues going after what he wants.",
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
    <MainChild>
      <div className="flex flex-col h-full px-2 pb-2">
        {!isBreakpoint &&
          <Image
            onClick={imageClick}
            priority
            src="/images/carlseaholmimage.jpg"
            className={`${clicked ? style.profilepicture.large : style.profilepicture.small} cursor-pointer`}
            height={clicked ? 200 : 100}
            width={clicked ? 200 : 100}
            alt="Carl Seaholm Profile Photo"
            style={{objectFit: 'cover', height: 'auto', width: 'auto'}}
          />
        }
        <h1 className="flex text-6xl font-bold pt-5 pr-5 justify-end">
          Carl Seaholm
        </h1>
        <div className='p-2 pt-15 w-full flex flex-row'>
          <div style={{flexGrow: 1, overflow: 'auto'}} className='scrollbar-thin scrollbar-webkit flex flex-col justify-start w-2/3'>
            <div className='flex justify-start w-2/3'>
              {blurbs[blurb]}
            </div>
            {
              blurb === 8 &&
              <Image
                onClick={() => setClicked(clicked ? false : true)}
                priority
                src={`${blurb === 8 ? '/images/benji.jpg' : ''}`}
                height={200}
                width={200}
                alt="Carl Seaholm Profile Photo"
                style={{objectFit: 'scale-down', height: 'auto', width: 'auto'}}
              />
            }
            {
              blurb === 9 &&
              <Image
                onClick={() => setClicked(clicked ? false : true)}
                priority
                src={`${blurb === 9 ? '/images/george.jpg' : ''}`}
                height={100}
                width={100}
                alt="Carl Seaholm Profile Photo"
                style={{objectFit: 'scale-down', height: 'auto', width: 'auto'}}
              />
            }
          </div>
          <div className='flex flex-col justify-start'>
            <div className='text-2xl font-bold'>
              Hobbies
            </div>
            {hobbies.map((hobby, index) => (
              <li key={index} className='cursor-pointer hover:text-gray-600' onClick={() => setBlurb(index + 1)}>
                {hobby}
              </li>
            ))}
            <div className='text-2xl font-bold'>
              Pets
            </div>
            {pets.map((pet, index) => (
              <li key={index} className='cursor-pointer hover:text-gray-600' onClick={() => setBlurb(index + 8)}>
                {pet}
              </li>
            ))}
          </div>
        </div>
      </div>
    </MainChild>
  );
}