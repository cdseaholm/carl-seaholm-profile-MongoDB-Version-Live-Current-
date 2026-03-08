'use client'

import { DateRangeType } from "@/models/types/time-types/date-range";
import LeftBoard, { HobbyCheckMarkType } from "./left-board/left-board";
import RightBoard from "./right-board";
import { IHobbyData } from "@/models/types/hobbyData";

interface DashBoardProps {
  dashToShow: 'hobbies' | 'stats' | 'sessions' | 'calendar';
  handleDashToShow: (dashToShow: 'hobbies' | 'stats' | 'sessions' | 'calendar') => void;
  adminID: boolean;
  handleDaySelected: (date: string) => void;
  daySelected: string;
  handleCurrFilteredDates: (filters: DateRangeType) => void;
  handleCurrFilteredHobbies: (hobbies: HobbyCheckMarkType[]) => void;
  handleOpenModal: (modal: 'newHobby' | 'logSession' | 'colorIndex' | null) => void;
  currDateFilters: DateRangeType;
  currHobbyFilters: HobbyCheckMarkType[];
  hobbyData: IHobbyData[];
}

export default function DashButtonBoard({ dashToShow, handleDashToShow, adminID, handleDaySelected, daySelected, handleCurrFilteredDates, handleCurrFilteredHobbies, handleOpenModal, currDateFilters, currHobbyFilters, hobbyData }: DashBoardProps) {

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
      <LeftBoard hobbies={hobbies} currDateFilters={currDateFilters} handleCurrFilteredDates={handleCurrFilteredDates} handleCurrFilteredHobbies={handleCurrFilteredHobbies} currHobbyFilters={currHobbyFilters} />
      <RightBoard dashToShow={dashToShow} handleDashToShow={handleDashToShow} handleDaySelected={handleDaySelected} daySelected={daySelected} adminID={adminID} handleFilteredDates={handleCurrFilteredDates} handleFilteredHobbies={handleCurrFilteredHobbies} handleOpenModal={handleOpenModal} />
    </div>
  )
}