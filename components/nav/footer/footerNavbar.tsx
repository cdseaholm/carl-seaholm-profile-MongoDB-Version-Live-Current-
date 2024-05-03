'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useMediaQuery from '@/components/listeners/WidthSettings';
import { useAlertContext } from '@/app/context/alert/alertcontext';

const FooterNavBar = () => {
    const pathname = usePathname();
    const breakpoint = useMediaQuery(768);
    const { setShowAlert, setAlertMessage } = useAlertContext();

    const handleShowAlert = () => {
        setShowAlert(true);
        setAlertMessage('Click Yes if this is shown')
    }

    return (
        <footer className={`flex flex-row justify-center items-center ${breakpoint ? 'py-3' : 'py-4 mt-2'}`}>
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
        </footer>
    );
}

export default FooterNavBar;