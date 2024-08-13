'use client'

import { IUserObject } from "@/models/types/userObject";

export function DashButtons({ handleDashToShow, dashToShow, customFields, handleCustomFieldToShow }: { handleDashToShow: (dashToShow: string, handleModalOpen: string | null) => void, dashToShow: string, customFields: IUserObject[], handleCustomFieldToShow: (customFieldToShow: number) => void }) {
    return (
        <>
            <select className="text-base hover:bg-gray-400" onChange={(e) => {
                handleCustomFieldToShow(e.target.tabIndex);
            }} defaultValue={customFields[0]?.title}>
                {customFields.map((field: IUserObject, index: number) => {
                    return (
                        <option key={index} value={field.title}>{field.title}</option>
                    )
                })}
            </select>
            {dashToShow !== 'calendar' ?
                (
                    <button className="text-base hover:bg-gray-400" onClick={() => {
                        handleDashToShow('calendar', 'calendar');
                    }}>
                        {'Calendar'}
                    </button>
                ) : (
                    <button className="text-base hover:bg-gray-400" onClick={() => {
                        handleDashToShow('calendar', 'calendar');
                    }}>
                        {'Select Day'}
                    </button>
                )
            }
            <button className="text-base hover:bg-gray-400" onClick={() => {
                handleDashToShow('stats', null);
            }}>
                {"Stats"}
            </button>
        </>
    )
}