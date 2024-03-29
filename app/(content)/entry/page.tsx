'use client'

import { env } from 'process';
import React, { useEffect, useState } from 'react';
import { Hobby } from '@/types/hobby';


export default function EntryPage() {
  const [usernamestate, setUsernameState] = useState('');
  const [passwordstate, setPasswordState] = useState('');
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openHobbies, setOpenHobbies] = useState(false);
  const user = process.env.USER;
  const password = process.env.PW;
  const [hobbies, setHobbies] = useState(null);

 

  const enter = () => {
    console.log('usernamestate:', usernamestate);
    console.log('user:', user);
    console.log('passwordstate:', passwordstate);
    console.log('password:', password);
  
    if (usernamestate === user && passwordstate === password) {
      setOpen(true);
    }
  }


  return (
    <>
    {!open &&
    <div className='flex flex-col justify-center items-center'>
      <div>
        <input 
          type='text' 
          placeholder='Username' 
          className='border-2 border-gray-300 p-2 rounded-lg' 
          value={usernamestate} 
          onChange={(e) => setUsernameState(e.target.value)} 
        />
        <input 
          type='text' 
          value={passwordstate} 
          placeholder='Password' 
          className='border-2 border-gray-300 p-2 rounded-lg mt-2' 
          onChange={(e) => setPasswordState(e.target.value)} />
      </div>
      <div>
        <button className='bg-white text-black p-2 rounded-lg mt-2' onClick={() => enter()}>Login</button>
      </div>
    </div>
    }
    {open &&
    <div className='flex flex-col justify-evenly'>
      <div>
        <div className='border-2 border-gray-300 p-2 rounded-lg mt-2 cursor-pointer' onClick={() => setOpenCategory(openCategory ? false : true)}/>{/**
        {openCategory && hobbies !== null &&
          hobbies.map(({hobby}: {hobby: Hobby}) => (
            <ul>
              {hobby.category}
            </ul>
          ))
        }
        */}
      </div>

    </div>
    }
    </>
  );
}