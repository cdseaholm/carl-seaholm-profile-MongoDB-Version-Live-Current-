'use client'

import { useModalContext } from "@/app/context/modal/modalContext";

export default function ActionButton({whichModal}: {whichModal: string}) {
    const { setModalOpen } = useModalContext();
    return (
        <div className="justify-center items-center cursor-pointer" onClick={() => setModalOpen(whichModal)}>
            <button className="text-xl">
                +
            </button>
        </div>
    )
} 