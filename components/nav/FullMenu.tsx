'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const FullMenu = () => {
    const pathname = usePathname();

    return (
        <nav className="flex justify-center flex-wrap p-3 space-x-4">
            {[
                ["Home", "/"],
                ["Blog", "/blog"],
                ["Projects", "/projects"],
                ["Services", "/services"],
            ].map(([name, route], index) => (
                <div key={index} className="hover:scale-125">
                    <Link href={route} className={`px-10 rounded-lg px-3 py-2 text-slate-700 font-medium hover:text-slate-900 ${pathname === route ? "underline" : ""}`}>
                            {name}
                    </Link>
                </div>
            ))}
        </nav>
    );

 };

export default FullMenu;