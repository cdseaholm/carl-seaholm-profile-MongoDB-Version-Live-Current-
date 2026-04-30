'use client'



import { HobbySessionInfo, IHobbyData } from "@/models/types/hobbyData";
import { FiWatch, FiList, FiAlignLeft, FiCrosshair, FiClock, FiTrash } from "react-icons/fi";
import LogSessionDatabaseHooks from "../hooks/database-hooks/log-session-database-hooks";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

function ConvertTime(time: number) {
    let timeToShow = '0 minutes' as string;
    if (time) {

        if (time > 60) {

            let newTHours = Math.floor(time / 60);
            let newTMins = time % 60;
            timeToShow = `${newTHours} hours, ${newTMins} minutes`;

        } else {
            timeToShow = `${time} minutes`
        }
    }
    return timeToShow;
}

export default function HobbyCard({ hobbySessionInfo, index, showCats, showDescriptions, showGoals, showTotTime, handleLoading, session, hobbyData }: { hobbySessionInfo: HobbySessionInfo, index: number, showCats: boolean, showDescriptions: boolean, showGoals: boolean, showTotTime: boolean, handleLoading: (loading: boolean) => void, session: Session | null, hobbyData: IHobbyData[] }) {

    const router = useRouter();
    const { handleSessionCall } = LogSessionDatabaseHooks();
    const infoClass = 'text-start flex-row flex items-center justify-start py-2 text-sm md:text-base';
    const hobbyInfo = hobbySessionInfo.hobbyData as IHobbyData;
    const category = hobbyInfo.category;
    const description = hobbyInfo.description;
    const goals = hobbyInfo.goals;
    if (!hobbySessionInfo.sessions || hobbySessionInfo.sessions.length === 0) {
        return null;
    }
    const sesh = hobbySessionInfo.sessions[0];
    const selectedDayMinutes = hobbySessionInfo.sessions.reduce((total, session) => {
        return total + (session.minutes ?? 0);
    }, 0);
    const specVal = ConvertTime(selectedDayMinutes);
    const hobbyVal = ConvertTime(hobbySessionInfo ? hobbySessionInfo.totalMinutes : 0);
    const title = hobbyInfo.title as string;

    const handleDeleteSession = async () => {
        if (!sesh) return;

        const confirmed = window.confirm(`Delete ${title} session (${specVal})?`);
        if (!confirmed) return;

        handleLoading(true);

        const sessionsToManipulate = [{
            hobbyKeyId: index,
            session: title,
            time: '0',
            mostFrequentlyUseTime: []
        }];

        await handleSessionCall({
            session,
            sessionsToManipulate,
            hobbyData: hobbyData,
            handleModalLoading: handleLoading,
            sessionsOTDCopy: [sesh],
            daySelected: '',
            handleLoading: () => { },
            closeModal: () => { },
            router
        });

        handleLoading(false);
    }

    return (
        <div key={index} className="flex flex-col justify-center items-center border border-neutral-400 rounded-md p-2 inset-shadow-md bg-orange-50 rounded-md w-full h-[20dvh] divide-y-1">
            <div className="flex flex-row justify-between items-center w-full px-4 py-1 h-content" style={{ width: '100%' }}>
                <h1 className={`text-sm md:text-base font-semibold underline flex-1`}>
                    {title || 'No title available'}
                </h1>
                <button onClick={() => {
                    handleDeleteSession();
                }}>
                    <FiTrash title="Delete this session" className="m-1 text-red-400 hover:text-red-200" size={20} />
                </button>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2 w-full p-2">
                <p className={infoClass}>
                    <FiWatch title="This session's time" className="m-2 flex-shrink-0" />
                    <span className="truncate">{specVal}</span>
                </p>
                {showCats && <p className={infoClass}>
                    <FiList title="Categories" className="m-2 flex-shrink-0" />
                    <span className="truncate">{category && category !== 'null' ? category : 'No categories available'}</span>
                </p>}
                {showDescriptions && <p className={infoClass}>
                    <FiAlignLeft title="Details" className="m-2 flex-shrink-0" />
                    <span className="line-clamp-2">{description && description !== 'null' ? description : 'No description available'}</span>
                </p>}
                {showGoals && <p className={`${infoClass} col-span-full`}>
                    <FiCrosshair title="Goals" className="m-2 flex-shrink-0" />
                    <span className="line-clamp-2">{goals[0] ? goals[0] : 'No goal available'}</span>
                </p>}
                {showTotTime && <p className={infoClass}>
                    <FiClock title="Total time For this hobby" className="m-2 flex-shrink-0" />
                    <span className="truncate">{hobbyVal}</span>
                </p>}
            </div>
        </div>
    );
}
