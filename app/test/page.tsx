'use client'

import { useLifeAspectStore } from "@/context/lifeAspectStore";
import { useSession } from "next-auth/react";



export default function Page() {
    const { data: session } = useSession();
    const setOpenLifeAspectModal = useLifeAspectStore((state) => state.setOpenLifeAspectModal);


    return (
        <div>
        <h1>HELLO! THIS IS RENDERING</h1>
        <div className="flex flex-col">
            {session?.user ? session.user.name : 'No user'}
            {session === null ? 'Null' : 'Not Null'}
            {session?.user?.email === undefined ? 'Undefined' : 'Not Undefined'}
        </div>
        <button onClick={() => setOpenLifeAspectModal('addcustom')}>Click me</button>
        </div>
    );
}