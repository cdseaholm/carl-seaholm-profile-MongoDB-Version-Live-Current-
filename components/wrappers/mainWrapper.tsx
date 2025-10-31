'use client';

import { useStateStore } from "@/context/stateStore";
import { Overlay } from "@mantine/core";


export default function MainWrapper({ children }: { children: React.ReactNode }) {

  const overlayState = useStateStore(state => state.overlay);

  return (
    <main className={`flex-1 min-h-0 w-full bg-transparent`}>
      {children}
      {overlayState && (
        <Overlay
          gradient="linear-gradient(145deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 100%)"
          opacity={0.85}
        />
      )}
    </main>

  )
}