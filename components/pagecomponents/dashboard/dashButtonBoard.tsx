'use client'

import { DashButtons } from "@/components/buttons/dashButtons";
import { useModalStore } from "@/context/modalStore";
import { HobbyColorMapType } from "@/models/types/colorMap";
import { FiPlus } from "react-icons/fi";

interface DashBoardProps {
  dashToShow: string;
  handleDashToShow: (dashToShow: string, handleModalOpen: string | null) => void;
  indexShown: boolean;
  setIndexShown: (indexShown: boolean) => void;
  adminID: boolean;
  hobbyColorMap: HobbyColorMapType[];
  handleDaySelected: (date: string) => void;
  daySelected: string;
}

export default function DashButtonBoard({ dashToShow, handleDashToShow, indexShown, setIndexShown, adminID, hobbyColorMap, handleDaySelected, daySelected }: DashBoardProps) {

  const setModalOpen = useModalStore((state) => state.setModalOpen);

  const handleClick = () => {
    setModalOpen('actions');
  };

  return (
    <div className="flex flex-row items-center justify-between w-full pr-1 md:px-6">
      <DashButtons dashToShow={dashToShow} handleDashToShow={handleDashToShow} indexShown={indexShown} setIndexShown={setIndexShown} hobbyColorMap={hobbyColorMap} handleDaySelected={handleDaySelected} daySelected={daySelected} />
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