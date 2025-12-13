'use client'



import { IHobbyData } from "@/models/types/hobbyData";
import { HobbySessionInfo } from "@/utils/apihelpers/get/initData/initDashboardParams";
import { FiWatch, FiList, FiAlignLeft, FiCrosshair, FiClock } from "react-icons/fi";

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

export default function HobbyCard({ hobby, index, showCats, showDescriptions, showGoals, showTotTime }: { hobby: HobbySessionInfo, index: number, showCats: boolean, showDescriptions: boolean, showGoals: boolean, showTotTime: boolean }) {

    // const setOpenEditSessionModal = useDataStore(state => state.setOpenEditSessionModal);
    // const setSessionToEdit = useDataStore(state => state.setSessionToEdit);
    const infoClass = 'text-start flex-row flex items-center justify-start py-2 text-sm md:text-base';
    const hobbyInfo = hobby.hobbyData as IHobbyData;
    const category = hobbyInfo.category;
    const description = hobbyInfo.description;
    const goals = hobbyInfo.goals;
    if (!hobby.sessions || hobby.sessions.length === 0) {
        return null; // Skip rendering if no sessions
    }
    if (hobby.sessions.length > 1) {
        console.log('Multiple sessions for this hobby on this day, showing first only');
    }
    const sesh = hobby.sessions[0];
    const specVal = ConvertTime(sesh.minutes as number);
    const hobbyVal = ConvertTime(hobby ? hobby.totalMinutes : 0);
    const title = hobbyInfo.title as string;

    // const handleEditButton = () => {
    //     const sessionToEdit = {
    //         hobbyTitle: sesh.hobbyTitle,
    //         sessionInfo: sesh,
    //         sessionTime: sesh.minutes.toString(),
    //         mostFrequentlyUseTime: hobby.timeFrequencies.map(tf => tf.time)
    //     } as EditSessionType;
    //     setSessionToEdit(sessionToEdit);
    //     setOpenEditSessionModal(true);
    // }

    return (
        <div key={index} className="flex flex-col justify-center items-center border border-neutral-400 rounded-md p-2 inset-shadow-md bg-orange-50 rounded-md w-full h-[20dvh] divide-y-1">
            <div className="flex flex-row justify-start items-center w-full px-4 py-1 h-content" style={{ width: '100%' }}>
                <h1 className={`text-sm md:text-base font-semibold underline flex-1`}>
                    {title || 'No title available'}
                </h1>
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