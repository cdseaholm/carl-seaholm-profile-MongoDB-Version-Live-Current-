import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";

export default function DashDropIndexButton() {

    const { hobbies } = useHobbyContext();

    return (
        <div className="flex flex-col justify-center items-center">
            <legend className="flex flex-col text-xs justify-center">
                    {hobbies?.map(hobby => (
                        <div key={hobby._id} className="flex flex-row justify-between items-center px-4">
                                <div className={`w-2 h-2 rounded-full`} style={{backgroundColor: hobby.color}}/>
                                <p>{hobby.title}</p>
                        </div>
                    ))}
                    {hobbies?.length === 0 &&
                        <p>No hobbies to show</p>
                    }
            </legend>
        </div>
    );
}