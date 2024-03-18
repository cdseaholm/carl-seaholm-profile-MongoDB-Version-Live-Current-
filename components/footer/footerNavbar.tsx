'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FooterNavBar = () => {
    const pathname = usePathname();

    return (
        <nav className="flex justify-center flex-wrap p-3 space-x-4">
            {[
                ["About", "/about"],
                ["Contact", "/contact"],
            ].map(([name, route], index) => (
                <div key={index}>
                    <Link href={route} className={`px-10 rounded-lg px-3 py-2 text-slate-900 font-medium hover:text-slate-700 ${pathname === route ? "underline" : ""}`}>
                            {name}
                    </Link>
                </div>
            ))}
        </nav>
    );
}

export default FooterNavBar;