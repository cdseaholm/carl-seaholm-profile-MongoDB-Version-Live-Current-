// app/providers.tsx
'use client'

import MainModal from '@/components/modals/mainmodal/mainmodal';
import AlertModal from '@/components/modals/Alert/alertmodal';
import LifeAspectModal from '@/components/modals/LifeAspect/lifeAspectModal';
import CalendarModalInit from '@/components/modals/modalContent/Calendar/calendarModalInit';

export function Providers() {

  return (
    <>
      <AlertModal />
      <MainModal />
      <LifeAspectModal />
      <CalendarModalInit />
    </>
  )
}