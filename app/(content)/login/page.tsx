'use client'

import React, { useState, useEffect } from 'react';
import { Hobby } from '@/types/hobby';
import { set } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then((res) => res.json());


const LoginPage = ({params} :{params:{id:number}}) => {
  const { data: hobby, error, isLoading } = useSWR<any>(`/api/posts/`+ params.id, fetcher);
  const [usernamestate, setUsernameState] = useState('');
  const [passwordstate, setPasswordState] = useState('');
  const [openCategory, setOpenCategory] = useState(false);
  const [openHobbies, setOpenHobbies] = useState(false);
  const [hobbiess, setHobbiess] = useState<Hobby[]>([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hobby) {
      setUsernameState(hobby.username);
      setPasswordState(hobby.password);
    }
  }, [hobby]);

  const enter = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (!usernamestate && !passwordstate) {
      var data = {
        "username": usernamestate,
        "password": passwordstate
      }
      console.log(data);
      fetch(`/api/login/`+params.id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.authenticated) {
            setHobbiess(data.user.hobbies);
          } else {
            // Handle failed login
          }
        });
  }
  
    setLoading(false);
  }


  return (
    <>
      <>
        {loading && <div className="loader"></div>}
          <form className='flex flex-col justify-center items-center' onSubmit={enter}>
            <div>
              <input
                type='text'
                placeholder='Username'
                className='border-2 border-gray-300 p-2 rounded-lg'
                value={usernamestate}
                onChange={(e) => setUsernameState(e.target.value)} />
              <input
                type='text'
                value={passwordstate}
                placeholder='Password'
                className='border-2 border-gray-300 p-2 rounded-lg mt-2'
                onChange={(e) => setPasswordState(e.target.value)} />
            </div>
            <div>
              <input type='submit' value="submit" className='bg-white text-black p-2 rounded-lg mt-2'>Login</input>
            </div>
          </form>
      </><style jsx>{`
      .loader {
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #3498db;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      `}</style>
    </>
  );
};

export default LoginPage;

