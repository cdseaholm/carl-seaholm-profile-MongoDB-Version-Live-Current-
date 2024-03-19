'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useMediaQuery from '../listeners/WidthSettings';

const FooterNavBar = () => {
    const pathname = usePathname();
    const breakpoint = useMediaQuery(768);

    return (
        <>
        <nav className="flex justify-center flex-wrap pb-5 space-x-4">
            {!breakpoint &&
            [
                ["Contact", "/contact"],
            ].map(([name, route], index) => (
                <div key={index}>
                    <Link href={route} className={`px-10 rounded-lg py-2 text-slate-900 font-medium hover:text-slate-700 ${pathname === route ? "underline" : ""}`}>
                            {name}
                    </Link>
                </div>
            ))}
        </nav>
        </>
    );
}

export default FooterNavBar;