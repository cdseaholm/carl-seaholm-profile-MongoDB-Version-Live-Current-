'use client'

import { IUserObject } from "@/models/types/userObject";

export function DashButtons({ handleDashToShow, dashToShow, userObjects, handleUserObjectToShow }: { handleDashToShow: (dashToShow: string, handleModalOpen: string | null) => void, dashToShow: string, userObjects: IUserObject[], handleUserObjectToShow: (userObjectToShow: number) => void }) {
    return (
        <>
            <select id='dropDownObjectSelect' name="dropDownObjectSelect" className="text-base hover:bg-gray-400 bg-transparent border-none rounded-md" onChange={(e) => {
                handleUserObjectToShow(e.target.tabIndex);
            }} defaultValue={userObjects[0]?.title}>
                {userObjects.map((field: IUserObject, index: number) => {
                    const firstChar = field.title.charAt(0).toUpperCase();
                    const newTitle = firstChar + field.title.slice(1);
                    return (
                        <option key={index} value={field.title}>{newTitle}</option>
                    )
                })}
            </select>
            {dashToShow !== 'calendar' ?
                (
                    <button className="text-base hover:bg-gray-400 rounded-md p-1" onClick={() => {
                        handleDashToShow('calendar', 'calendar');
                    }}>
                        {'Calendar'}
                    </button>
                ) : (
                    <button className="text-base hover:bg-gray-400 rounded-md p-1" onClick={() => {
                        handleDashToShow('calendar', 'calendar');
                    }}>
                        {'Select Day'}
                    </button>
                )
            }
            <button className="text-base hover:bg-gray-400 rounded-md p-1" onClick={() => {
                handleDashToShow('stats', null);
            }}>
                {"Stats"}
            </button>
        </>
    )
}