import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useModalContext } from "@/app/context/modal/modalContext";
import HobbyIndex from "@/components/buttons/hobbyindex";
import { IHobby } from "@/models/types/hobby";

const LargeViewDashnav = ({calDash, hobbies}: {calDash: boolean; hobbies: IHobby[] | null}) => {
    const { setCalDash } = useModalContext();

    return (
        <div className={`flex flex-row w-full justify-between items-center border-b border-gray-600 px-5 py-2`}>
            <div className={`flex flex-row justify-evenly items-center`}>
                <button className={`font-bold hover:bg-gray-400 rounded-lg p-1 ${calDash ? 'border border-gray-700' : ''} cursor-pointer text-xs`} onClick={() => {setCalDash(true)}}>
                    Calendar
                </button>
                <button className={`font-bold hover:bg-gray-400 rounded-lg p-1 ${!calDash ? 'border border-gray-700' : ''} cursor-pointer text-xs`} onClick={() => {setCalDash(false)}}>
                    Stats
                </button>
            </div>
            {hobbies && hobbies.length > 0 &&
                <HobbyIndex />
            }
        </div>
    );
}

export default LargeViewDashnav;