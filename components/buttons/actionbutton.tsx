'use client'

import { useModalContext } from "@/app/context/modal/modalContext";

export default function ActionButton({whichModal}: {whichModal: string}) {
    const { setModalOpen } = useModalContext();
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