'use client'

export function DashButtons({ handleDashToShow, dashToShow }: { handleDashToShow: (dashToShow: string, handleModalOpen: string | null) => void, dashToShow: string }) {
    return (
        <>
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
            <button className="text-base hover:bg-gray-400" onClick={() => {
                handleDashToShow('todo', null);
            }}>
                {"To-Do List"}
            </button>
        </>
    )
}