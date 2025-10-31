'use client'

import { useModalStore } from "@/context/modalStore";
import ColorMapPopover from "./ColorMap/colorMapPopover";

export function DashButtons({ handleDashToShow, dashToShow, handleDaySelected, daySelected }: { handleDashToShow: (dashToShow: string, handleModalOpen: string | null) => void, dashToShow: string, handleDaySelected: (date: string) => void, daySelected: string }) {

    const setShowCalendar = useModalStore(state => state.setShowCalendar);

    const buttonClass = `hover:bg-gray-300 rounded-md px-1 rounded-md bg-gray-400/40 border w-1/3`;
    const textClass = `text-sm sm:text-base hover:text-gray-800`

    return (
        <div className="flex flex-row justify-start items-center space-x-1 md:space-x-5 pr-2 w-full sm:w-1/2 p-2">
            {/**<select id='dropDownObjectSelect' name="dropDownObjectSelect" className="text-xs md:text-base hover:bg-gray-400 bg-transparent border-none rounded-md" onChange={(e) => {
                handleUserObjectToShow(e.target.value);
            }} defaultValue={userObjects ? userObjects[0]?.title : ''}>
                {userObjects ? userObjects.map((field: IUserObject, index: number) => {
                    const firstChar = field.title.charAt(0).toUpperCase();
                    const newTitle = firstChar + field.title.slice(1);
                    return (
                        <option key={index} value={index}>{newTitle}</option>
                    )
                }) : []}
            </select> */}
            {dashToShow !== 'calendar' ?
                (
                    <button className={`${buttonClass}`} onClick={() => {
                        handleDaySelected(daySelected);
                        setShowCalendar(true);
                    }}>
                        <p className={`${textClass}`}>{'Calendar'}</p>
                    </button>
                ) : (
                    <button className={`${buttonClass}`} onClick={() => {
                        setShowCalendar(true);
                    }}>
                        <p className={`${textClass}`}>{'Select Day'}</p>
                    </button>
                )
            }
            <button className={`${buttonClass}`} onClick={() => {
                handleDashToShow('stats', null);
            }}>
                <p className={`${textClass}`}>{"Stats"}</p>
            </button>
            <ColorMapPopover buttonClass={buttonClass} textClass={textClass} />
        </div>
    )
}