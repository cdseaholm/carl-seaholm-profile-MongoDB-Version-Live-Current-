'use client'

import { useState } from "react";
import type { post } from "../../../types/post";
import MobilePostItemList from "@/components/posts/mobilepostitemlist";
import useMediaQuery from "@/components/listeners/WidthSettings";
import React from "react";
import MobileInnerHeader from "@/components/innerheader/MobileInnerHeader";

const MobileBlogDropdown = ({categoriesForDrop, posts}: {categoriesForDrop: Array<string>; posts: Record<string, post[]>}) => {

    const isBreakpoint = useMediaQuery(768);
    const [open, setOpen] = useState(false);
    const divRef = React.useRef(null);
    const dropRef = React.useRef(null);
    const [category, setCategory] = useState('All');
    
    const toggle = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        const handleOutsideClick = (event: { target: any; }) => {
            if (!dropRef.current || !(dropRef.current as HTMLDivElement).contains(event.target as HTMLDivElement)) {
                if (!open) return;
                toggle();
            }
        };
        window.addEventListener('mousedown', handleOutsideClick);
        return () => window.removeEventListener('mousedown', handleOutsideClick);
    }, [open, dropRef, toggle]);

    return (
        <div style={{ minHeight: '80vh', maxHeight: '80vh'}}>
            <MobileInnerHeader name={'Blog'} styles={[]}>
                    <div ref={dropRef} onClick={toggle} className='flex flex-row justify-between cursor-pointer'>
                        <div className='relative flex z-30 flex text-black rounded'>
                        {category}
                        </div>
                    </div>
                    <div className='flex items-end'>
                    <svg
                        className="h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    </div>
                    {open && 
                        <div ref={divRef} className='absolute flex flex-col z-30 right-22 top-48 mt-2 justify-end text-left border border-gray-300 rounded-sm bg-clip-padding bg-slate-800/70 text-white shadow-lg w-32 cursor-pointer'>
                            {categoriesForDrop.map((category, id) => (
                                <div key={id} onClick={() => setCategory(category)} className='block px-4 py-2 text-sm text-white hover:bg-slate-800'>
                                    {category}
                                </div>
                            ))}
                        </div>
                    }
            </MobileInnerHeader>
            <div className="rounded-md mb-5" style={{ minHeight: '69vh', maxHeight: '69vh', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(100, 116, 139, 1) rgba(0, 0, 0, 0.1)',}} ref={divRef}>
                <div className={` flex flex-col gap-6 bg-white/30 py-4 px-4 rounded-md`}>
                        {posts !== null && category === 'All' &&
                            Object.keys(posts).map((category, id) => <MobilePostItemList key={id} category={category} posts={posts[category]} />
                            )
                        }
                        {posts !== null && category !== 'All' &&
                            <MobilePostItemList category={category} posts={posts[category]} />
                        }
                </div>
            </div>
        </div>
    );
    }

export default MobileBlogDropdown;