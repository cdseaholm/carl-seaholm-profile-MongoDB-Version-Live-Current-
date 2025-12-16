'use client'

import { useDataStore } from "@/context/dataStore";
import LeftBoard, { HobbyCheckMarkType } from "./left-board/left-board";
import RightBoard from "./right-board";

interface DashBoardProps {
  dashToShow: 'hobbies' | 'stats' | 'sessions';
  handleDashToShow: (dashToShow: 'hobbies' | 'stats' | 'sessions') => void;
  adminID: boolean;
  handleDaySelected: (date: string) => void;
  daySelected: string;
}

export default function DashButtonBoard({ dashToShow, handleDashToShow, adminID, handleDaySelected, daySelected }: DashBoardProps) {

  const hobbyData = useDataStore((state) => state.hobbyData);
  let hobbies = [] as HobbyCheckMarkType[];
  if (hobbyData && hobbyData.length > 0) {
      hobbyData.forEach(hobbySession => {
          hobbies.push({
              _id: hobbySession._id,
              title: hobbySession.title
          } as HobbyCheckMarkType);
      });
  }

  return (
    <div className="flex flex-row items-center justify-between w-full px-2 md:px-6 border-t border-gray-600 pt-2 mb-2">
      <LeftBoard hobbies={hobbies} />
      <RightBoard dashToShow={dashToShow} handleDashToShow={handleDashToShow} handleDaySelected={handleDaySelected} daySelected={daySelected} adminID={adminID} />
    </div>
  )
}