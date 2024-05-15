'use client'

import React, { useEffect, useState } from 'react';
import { useModalContext } from '@/app/context/modal/modalContext';
import { useSession } from 'next-auth/react';
import { IHobby } from '@/models/types/hobby';
import ModalHobby from '../AddHobbyTracker/hobbymodal';
import LogSessionModal from '../LogSession/logsession';

export default function ActionsModal() {
  const { data: session } = useSession();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [localCalDash, setLocalCalDash] = useState(true);


  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

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