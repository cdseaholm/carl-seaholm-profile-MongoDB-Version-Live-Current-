'use client'

import React, { useEffect, useState } from 'react';
import { useModalContext } from '@/app/context/modal/modalContext';
import { useSession } from 'next-auth/react';
import { FiArrowLeft } from "react-icons/fi";
import { useHobbyContext } from '@/app/context/hobby/hobbyModalContext';
import { useStateContext } from '@/app/context/state/StateContext';
import { IHobby } from '@/models/types/hobby';
import { useRouter } from 'next/navigation';
import DashDropActionsButton from '../../pagecomponents/dashboard/buttons/calViewButtons/dashactions';
import DashDropChangeViewButton from './helpers/dashdropchangeViewButton';
import DashDropFilterButton from '../../pagecomponents/dashboard/buttons/calViewButtons/dashFilter';
import DashDropIndexButton from './helpers/dashdropindexbutton';

export default function DashboardMobileDropdown() {
  const { openDashboardMobileDropdown, setOpenDashboardMobileDropdown } = useModalContext();
  const { data: session } = useSession();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { setLoading } = useStateContext();
  const { calDash } = useModalContext();
  const { hobbies } = useHobbyContext();
  const [localCalDash, setLocalCalDash] = useState(true);
  const [titles, setTitles] = useState([] as string[]);
  const [categories, setCategories] = useState([] as string[]);


  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleBack = () => {
    setSelectedOption(null);
  };

  useEffect(() => {
    setLoading(true);
    if (hobbies.length === 0) {
      setLoading(false);
      return;
    }
    setTitles(hobbies.map((hobby: IHobby) => hobby.title));
    setCategories(hobbies.map((hobby: IHobby) => hobby.categories).flat())
    setLoading(false);
    console.log('categories', categories);
        
  }, [hobbies, categories, setLoading]);

  useEffect(() => {
    if (calDash !== localCalDash) {
      setLocalCalDash(calDash);
      handleBack();
      setOpenDashboardMobileDropdown(false);
    }
  }, [calDash, localCalDash, setOpenDashboardMobileDropdown]);

  return (
    <div id="crud-modal" tabIndex={-1} aria-hidden="true" className={`${openDashboardMobileDropdown ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm`}>
      <div className="relative p-4 w-1/2 max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 py-2">
          <div className="flex items-center justify-between px-4 md:p-5 border-b rounded-t dark:border-gray-600">
            {selectedOption === null ? 
                (
                <div />
                ) : (
                <FiArrowLeft onClick={handleBack} />
                )
            }
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={() => setOpenDashboardMobileDropdown(false)}>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {selectedOption === null && <DashDropOptions session={session} onOptionSelect={handleOptionSelect} />}
          {selectedOption === 'Filter' && <DashDropFilterButton titles={titles} categories={categories} />}
          {selectedOption === 'Change View' && <DashDropChangeViewButton />}
          {selectedOption === 'Color Index' && <DashDropIndexButton />}
          {selectedOption === 'Actions' && session !== null && session !== undefined && session.user !== null && session.user !== undefined && session.user.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME && session.user.email !== null && session.user.email !== undefined &&
            <DashDropActionsButton />
          }
        </div>
      </div>
    </div>
  )
}

const DashDropOptions = ({ session, onOptionSelect }: { session: any, onOptionSelect: (option: string) => void }) => {
  return (
    <div className='flex flex-col font-bold space-y-2'>
      <button onClick={() => onOptionSelect('Filter')} className='hover:text-slate-400'>Filter</button>
      <button onClick={() => onOptionSelect('Change View')} className='hover:text-slate-400'>Change View</button>
      <button className='hover:text-slate-400' onClick={() => onOptionSelect('Color Index')}>Color Index</button>
      {session !== null && session !== undefined && session.user !== null && session.user !== undefined && session.user.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME && session.user.email !== null && session.user.email !== undefined &&
        <button className='hover:text-slate-400' onClick={() => onOptionSelect('Actions')}>Actions</button>
      }
    </div>
  );
};