

import { Hobby } from "@/types/hobby";
import DashTracker from "./trackers/dashTrackers";
import { ActualUser } from "@/types/user";
import { Session } from "lucia";

const MainDashBoard = ({filter, hobbies, user, adminID, session}: {filter: string; hobbies: Hobby[]; user: ActualUser | null; adminID: number; session: Session | null}) => {
    return (
        <div className="flex flex-col justify-center items-center">
            {hobbies.map((item, index) => {
                if (item.category.includes(filter)) {
                    return (
                        <DashTracker key={index} hobby={item} user={user} adminID={adminID} session={session} />
                    )
                }
            })}
        </div>
    )
};

export default MainDashBoard;