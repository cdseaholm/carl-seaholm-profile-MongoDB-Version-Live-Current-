

import { Hobby } from "@/types/hobby";
import DashTracker from "./trackers/dashTrackers";
import { ActualUser } from "@/types/user";

const MainDashBoard = ({filter, hobbies, user, adminID}: {filter: string; hobbies: Hobby[]; user: ActualUser | null; adminID: boolean;}) => {
    return (
        <div className="flex flex-col justify-center items-center">
            {hobbies.map((item, index) => {
                if (item.category.includes(filter)) {
                    return (
                        <DashTracker key={index} hobby={item} user={user} adminID={adminID} />
                    )
                }
            })}
        </div>
    )
};

export default MainDashBoard;