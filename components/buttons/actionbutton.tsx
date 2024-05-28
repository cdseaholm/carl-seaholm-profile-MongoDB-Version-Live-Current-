'use client'

import { useModalStore } from "@/context/modalStore";

export default function ActionButton({whichModal}: {whichModal: string}) {
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const handleClick = () => {
        setModalOpen(whichModal);
      };
    return (
        <div className="justify-center items-center cursor-pointer" onClick={handleClick}>
            <button className="text-xl">
                +
            </button>
        </div>
    )
} 