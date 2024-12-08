 // app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react';
import MainModal from '@/components/modals/mainmodal/mainmodal';
import AlertModal from '@/components/modals/Alert/alertmodal';
import LifeAspectModal from '@/components/modals/LifeAspect/lifeAspectModal';

export function Providers({children}: { children: React.ReactNode }) {

  return (
    <>
    <AlertModal />
    <MainModal />
    <LifeAspectModal />
      <NextUIProvider style={{height: '100%', width: '100%'}}>
        {children}
      </NextUIProvider>
    </>
  )
}