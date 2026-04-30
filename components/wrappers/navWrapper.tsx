'use client'

import { usePathname } from "next/navigation"

export default function NavWrapper() {

    const pathname = usePathname();

    return (
        pathname !== '/' && pathname !== '/about' && pathname !== '/contact' ? (
            <section className="flex flex-col justify-start items-center w-screen h-fit">
                {/** NavBar */}
            </section>
        ) : (
            <>
                {/** No NavBar */}
            </>
        )
    )
}