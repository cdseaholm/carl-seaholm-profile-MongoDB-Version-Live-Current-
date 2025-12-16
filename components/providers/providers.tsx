// app/providers.tsx
'use client'

import MainModal from '@/components/modals/mainmodal/mainmodal';
import LifeAspectModal from '@/components/modals/LifeAspect/lifeAspectModal';
import CalendarModalInit from '@/components/modals/modalContent/Calendar/calendarModalInit';
import NewHobbyFormModal from '@/components/modals/modalContent/AddHobbyTracker/hobbymodaldatainit';
import LogSessionDataInit from '@/components/modals/modalContent/LogSession/logsessiondatainit';
import { ModalsProvider } from '@mantine/modals';
import ColorIndexModal from '../modals/modalContent/ColorIndex/color-index-modal';

export function Providers() {

  return (
    <ModalsProvider>
      <MainModal />
      <LifeAspectModal />
      <CalendarModalInit />
      <NewHobbyFormModal />
      <LogSessionDataInit />
      <ColorIndexModal />
    </ModalsProvider>
  )
}