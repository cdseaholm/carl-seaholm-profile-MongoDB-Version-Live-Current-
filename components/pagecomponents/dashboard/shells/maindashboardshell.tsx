

import { Hobby } from "@/types/hobby";
import DashTrackerShell from "./dashtrackerShell";

const MainDashBoardShell = ({filter, hobbies }: {filter: string; hobbies: Hobby[];}) => {
    return (
        <div className="flex flex-col justify-center items-center">
            {hobbies.map((item, index) => {
                if (item.category.includes(filter)) {
                    return (
                        <DashTrackerShell key={index} hobby={item} />
                    )
                }
            })}
        </div>
    )
};

export default MainDashBoardShell;