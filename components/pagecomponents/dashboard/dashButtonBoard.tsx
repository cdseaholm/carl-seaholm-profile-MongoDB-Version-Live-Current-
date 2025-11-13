'use client'

import { DashButtons } from "@/components/buttons/dashButtons";
import { useModalStore } from "@/context/modalStore";
import { FiPlus } from "react-icons/fi";

interface DashBoardProps {
  dashToShow: string;
  handleDashToShow: (dashToShow: string, handleModalOpen: string | null) => void;
  adminID: boolean;
  handleDaySelected: (date: string) => void;
  daySelected: string;
}

export default function DashButtonBoard({ dashToShow, handleDashToShow, adminID, handleDaySelected, daySelected }: DashBoardProps) {

  const setModalOpen = useModalStore((state) => state.setModalOpen);

  const handleClick = () => {
    setModalOpen('actions');
  };

  return (
    <div className="flex flex-row items-center justify-between w-full pr-1 md:px-6">
      <DashButtons dashToShow={dashToShow} handleDashToShow={handleDashToShow} handleDaySelected={handleDaySelected} daySelected={daySelected} />
      {adminID ? (
        <button type="button" onClick={handleClick} className="border rounded-full hover:border-gray-500 p-1 border-transparent">
          <FiPlus />
        </button>
      ) : (
        <div />
      )}
    </div>
  )
}