'use client'

import { DashButtons } from "@/components/buttons/dashButtons";
import { useModalStore } from "@/context/modalStore";
import { ColorMapType } from "@/models/types/colorMap";

interface DashBoardProps {
  dashToShow: string;
  handleDashToShow: (dashToShow: string, handleModalOpen: string | null) => void;
  indexShown: boolean;
  setIndexShown: (indexShown: boolean) => void;
  adminID: boolean;
  colorMap: ColorMapType[];
}

export default function DashButtonBoard({ dashToShow, handleDashToShow, indexShown, setIndexShown, adminID, colorMap }: DashBoardProps) {

  const setModalOpen = useModalStore((state) => state.setModalOpen);

  const handleClick = () => {
    setModalOpen('actions');
  };

  return (
    <div className="flex flex-row items-center justify-between w-full pr-1 md:px-6">
      <DashButtons dashToShow={dashToShow} handleDashToShow={handleDashToShow} indexShown={indexShown} setIndexShown={setIndexShown} colorMap={colorMap} />
      {adminID ? (
        <button className="text-xl" onClick={handleClick}>
          +
        </button>
      ) : (
        <div />
      )}
    </div>
  )
}