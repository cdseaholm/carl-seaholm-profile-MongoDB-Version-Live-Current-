'use client'

import { SocialIcon } from "react-social-icons";
import { CgWebsite } from "react-icons/cg";
import openInNewTab from "../listeners/OpenInNewTab";
import { useStateStore } from "@/context/stateStore";

export default function SocialBar({ fadeOutBegin, fadeInBegin, shell }: { fadeOutBegin: boolean, fadeInBegin: boolean, shell: boolean }) {

    const widthQuery = useStateStore(state => state.widthQuery);

    const style = {
        icon: {
            height: 35,
            width: 35,
            margin: 5,
            border: '1px solid white',
            borderRadius: '50%',
            alignContent: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        },
        small: {
            height: 28,
            width: 28,
            margin: 0,
            border: '1px solid white',
            borderRadius: '50%',
            alignContent: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        }
    };

    return (
        !shell ? (
            <div className={`flex flex-row justify-evenly items-center w-full px-2 md:w-2/3 ${fadeOutBegin ? 'fade-out' : fadeInBegin ? 'fade-in' : ''}`}>
                <div className='cursor-pointer' onClick={() => openInNewTab('http://www.github.com/cdseaholm')}>
                    <SocialIcon style={widthQuery > 639 ? style.icon : style.small} network={'github'} title={`Carl's LinkedIn`} />
                </div>
                <div className='cursor-pointer' onClick={() => openInNewTab('https://www.linkedin.com/in/carlseaholm/')}>
                    <SocialIcon style={widthQuery > 639 ? style.icon : style.small} network={'linkedin'} title={`Carl's LinkedIn`} />
                </div>
                <div className='cursor-pointer text-white'>
                    <CgWebsite style={widthQuery > 639 ? style.icon : style.small} title="New Progress Co website" className="px-1" href="https://www.newprogressco.com" />
                </div>
            </div>
        ) : (
            <div className={`flex flex-row justify-evenly items-center w-full px-2 md:w-2/3 w-full px-2 md:w-2/3 sm:h-[45px] h-[28px]`} />
        )
    );
}