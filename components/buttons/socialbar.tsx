import SocialButton from "./socialButton";
import { CgWebsite } from "react-icons/cg";

export default function SocialBar() {
    return (
        <div className='flex flex-row justify-start items-center space-x-4'>
            <SocialButton networkName='github' parent={false}/>
            <SocialButton networkName='linkedin' parent={false}/>
            <div className="rounded-full border border-black">
                <CgWebsite size={30} title="New Progress Co website" className="cursor-pointer" href="https://www.newprogressco.com" />
            </div>
        </div>
    );
}