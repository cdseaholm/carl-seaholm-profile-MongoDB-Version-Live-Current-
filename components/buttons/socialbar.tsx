import SocialButton from "./socialButton";
import { CgWebsite } from "react-icons/cg";

export default function SocialBar() {
    return (
        <div className='flex flex-row justify-end items-center space-x-4 w-full'>
            <SocialButton networkName='github' parent={false}/>
            <SocialButton networkName='linkedin' parent={false}/>
            <div className="rounded-full border border-white text-white">
                <CgWebsite size={30} title="New Progress Co website" className="cursor-pointer px-1" href="https://www.newprogressco.com" />
            </div>
        </div>
    );
}