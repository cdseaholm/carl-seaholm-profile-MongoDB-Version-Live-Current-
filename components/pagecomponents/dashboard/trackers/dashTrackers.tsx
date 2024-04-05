import { Hobby } from "@/types/hobby";
import { ActualUser } from "@/types/user";

const DashTracker = ({ hobby, user, adminID }: { hobby: Hobby, user: ActualUser | null, adminID: number }) => {

    return (
        <div className="flex flex-col justify-center items-center w-3/4 bg-gray-500 rounded-md">
            <h1 className="text-2xl font-bold">{hobby.title}</h1>
            <p className="text-xs text-center">{hobby.descriptions}</p>
            <p className="text-xs text-center">Today&apos;s session was 5 hours</p>
            {user && user.id === adminID &&
            <div className="flex flex-row justify-evenly text-sm w-full p-2">
                <button>
                    Edit
                </button>
                <button>
                    Log Session
                </button>
            </div>
            }
        </div>
    )
};

export default DashTracker;