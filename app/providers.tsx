 // app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react';
import MainModal from '@/components/modals/mainmodal/mainmodal';
import AlertModal from '@/components/modals/Alert/alertmodal';

export function Providers({children}: { children: React.ReactNode }) {

  return (
    <>
    <AlertModal />
    <MainModal />
      <NextUIProvider style={{height: '100%', width: '100%'}}>
        {children}
      </NextUIProvider>
    </>
  )
}