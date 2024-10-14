'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import MainChild from '@/components/pagetemplates/mainchild/mainchild';
import InnerTemplate from '@/components/pagetemplates/innerTemplate/innerTemplate';

export default function Personal() {
  const [clicked, setClicked] = useState(false);
  const [blurb, setBlurb] = useState(0);
  const hobbies = ['Brazilian Jiu Jitsu', 'Coding', 'Guitar', 'Language Learning', 'Piano', 'Reading', 'Writing'];
  const pets = ['Benji', 'George'];
  const blurbs = [
    'I am a software engineer, writer, and musician. I am currently working on building a career path for myself in the Engineering world. I have a strong passion for development, fitness, and overall self-improvement. The amount of hobbies and interests I have would create a wall of text here, so click on any of the hobbies or pets on the right to learn more.',
    'Currently a purple belt, I relish the challenges that comes with Jiu Jitsu and the lessions it teaches me. I hope to some day be a blackbelt.',
    'I am currently focusing on improving my JavaScript and TSX applications, as well as working on updating clients websites to be a bit more updated and fresh. I am also currently working on a coding project that will hopefully unite a professional and personal experience for those that want to enhance their hireability, improve outreach for their hobbies, or stay conneted with close ones.',
    'When it comes to guitar playing, I am working on my music theory and how it applies to jazz chords, triads, and fingerstyle techniques.',
    'I am currently learning Spanish, Japanese, and Mandarin. I have dabbled in Latin. And I am a bit more advanced in Italian. I can not speak any of these languages fluently, or well for that matter (except maybe Italian), it is just a fun mental excercise for me to do everyday.',
    'I am learning to site read while playing piano.',
    'I am currently reading "Iron Flame" by Rebecca Yarros. Previous reads: "The Burning God" by R.F. Kuang',
    'I am polishing my first novel as well as submitting to agencies for my first publication. As well as I have begun to write my second book which should be the first in a series.',
    'Benji is a 1 year old Bengal Cat. He is very sweet, loving, and is an overall playful cat. He tends to enjoy being alone from time from time to time, but he is very good with guests. He is a very good cat to have around.',
    "George is a 6 months old Bengal Cat. He is much more wild and crazy than his brother Benjamin. Both share the same dad so they have taken to eachother very well. George is very playful. He loves to cuddle and has a great purr. You'll find he has no issues going after what he wants.",
  ];

  return (
    <MainChild>
      <div className={`flex flex-row w-full justify-between items-center px-5 md:px-10 py-2 md:py-4 w-full`}>
        <h1 className="text-lg md:text-3xl font-bold justify-end">
          Carl Seaholm
        </h1>
        <select id='personalFilter' name='personalFilter' className='text-xs md:text-sm bg-zinc-200 rounded-lg' defaultValue={'All'} onChange={(e) => {
          setBlurb(parseInt(e.target.value));
        }}>
          <option value={0}>All</option>
          <optgroup label='Hobbies'>
            {hobbies.map((hobby, index) => (
              <option key={index} value={index + 1} className="w-full text-black bg-transparent hover:text-neutral-600 hover:underline">
                {hobby}
              </option>
            ))}
          </optgroup>
          <optgroup label='Pets'>
            {pets.map((pet, index) => (
              <option key={index} value={index + 8} className="w-full text-black bg-transparent hover:text-neutral-600 hover:underline">
                {pet}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      <InnerTemplate>
        <div className='flex flex-col justify-start items-start p-2'>
          {blurb === 0 &&
            <div className='text-md md:text-lg font-bold pb-2'>
              {`About me personally:`}
            </div>
          }
          <div className='text-sm md:text-base'>
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
              style={{ objectFit: 'scale-down', height: 'auto', width: 'auto' }}
            />
          }
          {
            blurb === 9 &&
            <Image
              onClick={() => setClicked(clicked ? false : true)}
              priority
              src={`${blurb === 9 ? '/images/george.jpg' : ''}`}
              height={200}
              width={200}
              alt="Carl Seaholm Profile Photo"
              style={{ objectFit: 'scale-down', height: 'auto', width: 'auto' }}
            />
          }
        </div>
      </InnerTemplate>
    </MainChild>
  );
}