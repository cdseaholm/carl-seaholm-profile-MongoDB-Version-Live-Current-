


import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useEffect, useState } from "react";
import { IHobby } from "@/models/types/hobby";
import useMediaQuery from "@/components/listeners/WidthSettings";
import { useModalContext } from "@/app/context/modal/modalContext";
import MonthConverter from "@/components/pagecomponents/dashboard/buttons/calViewButtons/monthconverter";
import ScrollChild from "@/components/pagetemplates/scrollableChild/scrollChild";
import LargeViewDashnav from "../buttons/calViewButtons/largeViewDashnav";
import MonthViewPiece from "../pieces/calviewPieces/monthViewPiece";
import HobbiesInDayView from "../pieces/calviewPieces/hobbiesInDayView";

const MainDashBoard = ({filter, hobbies}: {filter: string; hobbies: IHobby[] | null;}) => {

    const { daySelected } = useHobbyContext();
    const { calDash } = useModalContext();
    const isBreakpoint = useMediaQuery(768);

    return (
        <div className={`flex flex-col bg-gray-500 rounded-md h-full w-full`}>    
            <MonthViewPiece daySelected={daySelected} hobbies={hobbies}/>
            {!isBreakpoint &&
                <LargeViewDashnav hobbies={hobbies} calDash={calDash}/>
            }
            {daySelected !== '' &&
                <HobbiesInDayView />
            }      
        </div>
    )
};

export default MainDashBoard;