import { Popover } from "@mantine/core";
import { IoIosInformationCircle } from "react-icons/io";

export default function ContinuePrompt({ scrollPrompt }: { scrollPrompt: boolean }) {
    return (
        scrollPrompt ? (
            <p className={`text-base md:text-lg lg:text-xl font-sans p-1`}>
                {`Ready to continue? Scroll down and click continue`}
            </p>
        ) : (
            <div className="flex flex-row justify-end items-center w-full h-content">
                <Popover width={200} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                        <button className="cursor-pointer">
                            <IoIosInformationCircle size={25} color="black" />
                        </button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <p>Ready to continue? Scroll down and click continue</p>
                    </Popover.Dropdown>
                </Popover>
            </div>
        )
    )
}