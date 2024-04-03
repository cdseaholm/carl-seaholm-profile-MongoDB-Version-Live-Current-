'use client'

import React, { useState } from "react";
import InnerHeader from "@/components/pagetemplates/innerheader/InnerHeader";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import useMediaQuery from "@/components/listeners/WidthSettings";
import { useSession } from "@/app/SessionContext";
import fetchHobbies from "@/lib/prisma/queries/hobbies";
import type { Hobby } from "@/types/hobby";

const Dashboard = () => {
    
    const isBreakpoint = useMediaQuery(768);
    const [filterNoTrack, setFilterNoTrack] = useState(false);
    const [item, setItem] = useState('');
    const [open, setOpen] = useState(false);
    const [hobbies, setHobbies] = useState([] as Hobby[]);
    const divRef = React.useRef<HTMLDivElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const { user } = useSession();
    console.log(user);
    
    //change this to hobbies fetched
    const toTrack = [
        {name: 'All', category: 'All'},
        {name: 'Brazilian Jiu Jitsu', category: 'Physical'},
        {name: 'Coding', category: 'Technological'},
        {name: 'Guitar', category: 'Musical'},
        {name: 'Gym', category: 'Physical'},
        {name: 'Language Learning', category: 'Hobbies'},
        {name: 'Piano', category: 'Musical'},
        {name: 'Reading', category: 'Arts'},
        {name: 'Writing', category: 'Arts'},
    ];

    React.useEffect(() => {
      const handleOutsideClick = (event: { target: any; }) => {
        if ((!dropdownRef.current || !dropdownRef.current.contains(event.target as HTMLDivElement)) && 
            (!divRef.current || !divRef.current.contains(event.target as HTMLElement))) {
            if (open) {
                setOpen(false);
            }
        }
    };
      window.addEventListener('mousedown', handleOutsideClick);
      return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [setOpen, divRef, dropdownRef, open]);

    React.useEffect(() => {
      const getHobbies = async () => {
        if (user) {
          const gottenHobbies = await fetchHobbies({user});
          console.log(gottenHobbies);
          if (gottenHobbies) {
            setHobbies(gottenHobbies);
          }
        }
      };
      getHobbies();
    }, [user, setHobbies]);

    const flipFilter = ({which}: {which: string}) => {
        if (which === 'track') {
            if (!filterNoTrack) return;
            setFilterNoTrack(!filterNoTrack);
            setItem('');
        } else if (which === 'filter') {
            if (filterNoTrack) return;
            setFilterNoTrack(!filterNoTrack);
            setItem('');
        }
    }

    const filterDefault = filterNoTrack ? 'No Filter' : 'All Categories';
    const items = Array.from(new Set(filterNoTrack ? toTrack.map((item) => item.category).sort((a, b) => (a < b) ? -1: 1) : toTrack.map((item) => item.name)));

    return (
        <div>
            <InnerHeader>
            <div className='flex flex-col'>
          <div className='flex flex-row w-full justify-evenly divide-x divide-slate-900 border border-slate-900 mb-2' style={{minWidth: '16vh'}}>
            <div onClick={() => flipFilter({which: 'track'})} className={`${filterNoTrack ? `text-slate-600` : `text-white`} w-1/2 text-center text-sm cursor-pointer`}>
              Trackers
            </div>
            <div onClick={() => flipFilter({which: 'filter'})} className={`${!filterNoTrack ? `text-slate-600` : `text-white`} w-1/2 text-center text-sm cursor-pointer`}>
              Filters
            </div>
          </div>
          <div ref={divRef} className='flex flex-row justify-center w-full'>
            <button id='dropButton' onClick={open ? () => setOpen(false) : () => setOpen(true)} className='cursor-pointer'>
              <div className='relative flex z-30 flex text-black rounded text-sm'>
                {item === '' ? filterDefault : item}
              </div>
            </button>
            <div className='flex items-center'>
              <svg
                className="h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {open && 
              <div ref={dropdownRef} className='absolute flex flex-col z-20 right-22 top-40 mt-2 justify-end text-left border border-gray-300 rounded-sm bg-clip-padding bg-slate-800/70 text-white shadow-lg w-32 cursor-pointer'>
                {items.map((item, index) => (
                  <div key={index} onClick={() => {
                    setItem(item)
                    setOpen(false)
                  }} 
                  className='block px-4 py-2 text-sm text-white hover:bg-slate-800'>
                    {item}
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
                <div className="flex flex-col justify-end">
                    <h1 className={`${isBreakpoint ? 'text-xl' : 'text-4xl'} font-bold`}>Dashboard</h1>
                </div>
            </InnerHeader>
            <MainChild>
                <div className="flex flex-col justify-center">
                  {user && user.email === 'cdseaholm@gmail.com' &&
                  <div className="flex flex-row justify-end cursor-pointer">
                    + Add New Tracker
                  </div>
                  }
                  <div>
                    {hobbies.map((hobby, index) => (
                      <div key={index} className="flex flex-row justify-between">
                        <div>{hobby.title}</div>
                        <div>{hobby.category}</div>
                      </div>
                    ))}
                  </div>
                </div>
            </MainChild>
        </div>
    );
};

export default Dashboard;