'use client'

import React, { useEffect, useState } from 'react';
import { useModalContext } from '@/app/context/modal/modalContext';
import { useSession } from 'next-auth/react';
import { FiArrowLeft } from "react-icons/fi";
import { useHobbyContext } from '@/app/context/hobby/hobbyModalContext';
import { useStateContext } from '@/app/context/state/StateContext';
import { IHobby } from '@/models/types/hobby';
import DashDropFilterButton from '../../../pagecomponents/dashboard/buttons/calViewButtons/dashFilter';
import ModalHobby from '../AddHobbyTracker/hobbymodal';
import LogSessionModal from '../LogSession/logsession';

export default function ActionsModal() {
  const { data: session } = useSession();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { setLoading } = useStateContext();
  const { calDash, setModalOpen, modalOpen } = useModalContext();
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
      setModalOpen('');
    }
  }, [calDash, localCalDash, setModalOpen]);

  return (
    <>
      {selectedOption === null && <DashDropOptions session={session} onOptionSelect={handleOptionSelect} />}
      {selectedOption === 'Add Tracker' && <ModalHobby />}
      {selectedOption === 'Log Session' && <LogSessionModal />}
      {selectedOption === 'Edit' && <div />}
    </>
  )
}

const DashDropOptions = ({ session, onOptionSelect }: { session: any, onOptionSelect: (option: string) => void }) => {
  return (
    <div className='flex flex-col font-bold space-y-2'>
      <button onClick={() => onOptionSelect('Add Tracker')} className='hover:text-slate-400'>Add Tracker</button>
      <button onClick={() => onOptionSelect('Log Session')} className='hover:text-slate-400'>Log Session</button>
      <button className='hover:text-slate-400' onClick={() => onOptionSelect('Edit')}>Edit</button>
    </div>
  );
};