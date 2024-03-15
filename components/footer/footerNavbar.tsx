'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FooterNavBar = () => {
    const pathname = usePathname();

    return (
        <nav className="flex justify-center flex-wrap p-3 border-b-2 border-black-500 space-x-4">
            {[
                ["About", "/about"],
                ["Contact", "/contact"],
            ].map(([name, route], index) => (
                <div key={index}>
                    <Link href={route} className={`rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900 ${pathname === route ? "underline" : ""}`}>
                            {name}
                    </Link>
                </div>
            ))}
        </nav>
    );
}

export default FooterNavBar;