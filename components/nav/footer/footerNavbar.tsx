'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useMediaQuery from '@/components/listeners/WidthSettings';
import { useModalContext } from '@/app/context/modal/modalContext';

const FooterNavBar = () => {
    const pathname = usePathname();
    const breakpoint = useMediaQuery(768);
    const { setShowAlert, setAlertMessage } = useModalContext();

    const handleShowAlert = () => {
        setShowAlert(true);
        setAlertMessage('Click Yes if this is shown')
    }

    return (
        <>
        <nav className={`flex flex-row justify-center items-center`} style={{height: '6vh'}}>
            {!breakpoint && pathname !== '/' &&
            [
                ["Contact", "/contact"],
            ].map(([name, route], index) => (
                <div key={index}>
                    <Link href={route} className={`px-10 rounded-lg py-2 font-medium hover:text-slate-700 ${pathname === route ? "underline" : ""}`}>
                            {name}
                    </Link>
                </div>
            ))}
        </nav>
        </>
    );
}

export default FooterNavBar;