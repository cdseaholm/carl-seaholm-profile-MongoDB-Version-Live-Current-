'use client'

import { useRouter } from 'next/navigation';

const NavButton = () => {
    const router = useRouter();
    return (
        <button
            type="button"
            className='cursor-pointer'
            onClick={()=> router.replace('/')}>Back to Home
        </button>
    )
}

export default NavButton;