'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FooterNavBar = () => {

    const pathname = usePathname();

    return (
        <footer className={`flex flex-row justify-center items-center border-t border-gray-400 py-10 mt-10`}>
            {pathname !== '/' &&
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