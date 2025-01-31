// app/providers.tsx
'use client'

import MainModal from '@/components/modals/mainmodal/mainmodal';
import AlertModal from '@/components/modals/Alert/alertmodal';
import LifeAspectModal from '@/components/modals/LifeAspect/lifeAspectModal';
import { ModalsProvider } from "@mantine/modals";

export function Providers() {

  return (
    <ModalsProvider>
      <AlertModal />
      <MainModal />
      <LifeAspectModal />
    </ModalsProvider>
  )
}