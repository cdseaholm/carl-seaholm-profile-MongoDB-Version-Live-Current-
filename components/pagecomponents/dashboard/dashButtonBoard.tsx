import ActionButton from "@/components/buttons/actionbutton";
import { DashButtons } from "@/components/buttons/dashButtons";
import { ColorMapType } from "@/models/types/colorMap";
import { IUserObject } from "@/models/types/userObject";
import { Session } from "next-auth";

interface DashBoardProps {
    dashToShow: string;
    handleDashToShow: (dashToShow: string, handleModalOpen: string | null) => void;
    userObjects: IUserObject[];
    handleUserObjectToShow: (objectToUse: string) => void;
    indexShown: boolean;
    setIndexShown: (indexShown: boolean) => void;
    adminID: boolean;
    session: Session | null;
    colorMap: ColorMapType[];
}

export default function DashButtonBoard({ dashToShow, handleDashToShow, userObjects, handleUserObjectToShow, indexShown, setIndexShown, adminID, session, colorMap }: DashBoardProps) {

    console.log('adminIDBool', adminID, 'sessionID', session?.user?.email, 'adminID', process.env.NEXT_PUBLIC_ADMIN_USERNAME);
    return (
        <div className="flex flex-row justify-between items-center px-5 py-2">
          <div className="flex flex-row justify-between items-center space-x-5">
            <DashButtons dashToShow={dashToShow} handleDashToShow={handleDashToShow} userObjects={userObjects} handleUserObjectToShow={handleUserObjectToShow} indexShown={indexShown} setIndexShown={setIndexShown} colorMap={colorMap} />
          </div>
          {adminID ? (
            <ActionButton whichModal="actions" />
          ) : (
            <div />
          )}
        </div>
    )
}