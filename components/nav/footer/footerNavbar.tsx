'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStateStore } from '@/context/stateStore';

const FooterNavBar = () => {
    const pathname = usePathname();
    const breakpoint = useStateStore((state) => state.widthQuery) < 768 ? true : false;

    return (
        <footer className={`flex flex-row justify-center items-center ${breakpoint ? 'py-1' : 'py-4 mt-2'}`}>
            {!breakpoint && pathname !== '/' &&
            [
                ["Contact", "/contact"],
            ].map(([name, route], index) => (
                <div key={index}>
                    <Link href={route ? route : ''} className={`px-10 rounded-lg py-2 font-medium hover:text-slate-700 ${pathname === route ? "underline" : ""}`}>
                            {name}
                    </Link>
                </div>
            ))}
        </footer>
    );
}

export default FooterNavBar;