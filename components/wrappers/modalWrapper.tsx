'use client'

import dynamic from "next/dynamic"

const ModalProvider = dynamic(() => import('@/components/providers/modalProvider'), {
    ssr: false
});

export default function ModalWrapper() {
    return <ModalProvider />
}