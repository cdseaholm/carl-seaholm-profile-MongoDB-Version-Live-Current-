import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { Hobby } from "@/types/hobby";
import { ActualUser } from "@/types/user";
import { Session } from "lucia";

const DashTracker = ({ hobby, user, adminID, session }: { hobby: Hobby, user: ActualUser | null, adminID: number; session: Session | null }) => {

    const {setOpenLogSessionModal } = useHobbyContext();

    const handleDesireToEdit = () => {
        console.log('Edit button clicked');
    }

    const handleDesireToLog = () => {
        setOpenLogSessionModal(true)
    }

    return (
        <div className="flex flex-col justify-center w-3/4 my-2 bg-gray-500 rounded-md">
            <div className="flex flex-row justify-between px-5 py-5">
                <div className="flex flex-col w-1/2 justify-start">
                    <h1 className="text-2xl font-bold">{hobby.title}</h1>
                    <p className="text-xs text-start">{hobby.descriptions}</p>
                </div>
                <div className="flex flex-row w-1/2 justify-start" style={{overflowX: 'auto'}}>
                    {hobby && hobby.date.map((item, index) => {
                        if (item !== '' || item !== null || item !== undefined || item !== ' ' || item !== '0')
                            return (
                                <div key={index} className="py-2 px-2 flex flex-col">
                                    <p className="text-xs font-bold text-center">Date: {item}</p>
                                    <p className="text-xs font-bold text-center">Time: {hobby.minutesXsession[index]}</p>
                                </div>
                            )
                    })}
                </div>
            </div>
            {user !== null && user.id === adminID && session !== null && parseInt(session.userId) === adminID &&
            <div className="flex flex-row justify-evenly text-sm w-full p-2">
                <button onClick={handleDesireToEdit}>
                    Edit
                </button>
                <button onClick={handleDesireToLog}>
                    Log Session
                </button>
            </div>
            }
        </div>
    )
};

export default DashTracker;