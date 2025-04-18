'use client'

import React from 'react';
import { useModalStore } from '@/context/modalStore';

export default function ActionsModal() {

  const setModalOpen = useModalStore((state) => state.setModalOpen);
  const setModalParent = useModalStore((state) => state.setModalParent);

  return (
    <div className='flex flex-col font-bold space-y-2'>
      <button onClick={() => {setModalOpen('addhobby'); setModalParent('actions')}} className='hover:text-slate-400'>Add Tracker</button>
      <button onClick={() => {setModalOpen('logsession'); setModalParent('actions')}} className='hover:text-slate-400'>Log Session</button>
      <button className='hover:text-slate-400' onClick={() => {{/**setModalOpen('edit') */} console.log('editclicked')}}>Edit</button>
    </div>
  );
}