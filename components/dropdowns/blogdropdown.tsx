'use client'

import { useState } from "react";
import PostItemList from "@/components/posts/postlistitem";
import type { post } from "@/models/types/post";
import React from "react";
import InnerHeader from "@/components/pagetemplates/innerheader/InnerHeader";
import MainChild from "../pagetemplates/mainchild/mainchild";
import { useSession } from "next-auth/react";
import { useModalStore } from "@/context/modalStore";


const BlogDropdown = ({categoriesForDrop, posts}: {categoriesForDrop: Array<string>; posts: Record<string, post[]>}) => {

    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('All');
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLDivElement>(null);
    const hasShownSubscriptionPrompt = React.useRef(false);
    const { data: session } = useSession();
    const user = session?.user;
    const setModalOpen = useModalStore((state) => state.setModalOpen);

    React.useEffect(() => {
            if (user === null && !hasShownSubscriptionPrompt.current) {
                hasShownSubscriptionPrompt.current = true;
                const newSub = window.confirm('Would you like to Subscribe to this blog?');
                if (newSub === true) {
                    setModalOpen('subscribe');
                } else {
                    console.log('User declined to subscribe');
                }
            }
        
    }, [user, hasShownSubscriptionPrompt, setModalOpen]);

    React.useEffect(() => {
        const handleOutsideClick = (event: { target: any; }) => {
            if ((!dropdownRef.current || !dropdownRef.current.contains(event.target as HTMLDivElement)) && 
                (!buttonRef.current || !buttonRef.current.contains(event.target as HTMLElement))) {
                if (open) {
                    setOpen(false);
                }
            }
        };
        window.addEventListener('mousedown', handleOutsideClick);
        return () => window.removeEventListener('mousedown', handleOutsideClick);
    }, [dropdownRef, open, buttonRef]);

    return (
        <MainChild>
            <InnerHeader>
                <header className="underline text-4xl">
                    Blog
                </header>
                <div ref={buttonRef} className="flex flex-row items-center">
                    <button id="dropButton" onClick={open ? () => setOpen(false) : () => setOpen(true)} className='flex flex-row justify-between cursor-pointer'>
                        <p className='flex pr-2'>
                            Filter:
                        </p>
                        <div className='relative text-black rounded'>
                            {category}
                        </div>
                    </button>
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
                </div>
                {open && 
                    <div ref={dropdownRef} className='absolute flex flex-col z-30 right-16 top-32 mt-2 justify-end text-left border border-gray-300 rounded-sm bg-clip-padding bg-slate-800/70 text-white shadow-lg w-32 cursor-pointer'>
                        {categoriesForDrop.map((category, id) => (
                            <div key={id} onClick={() => {
                                setCategory(category)
                                setOpen(false)
                            }} className='block px-4 py-2 text-sm text-white hover:bg-slate-800'>
                                {category}
                            </div>
                        ))}
                    </div>
                }
            </InnerHeader>
                    <div className={`${category === 'All' ? `md:grid md:grid-cols-2 w-full h-full justify-center` : `flex flex-col items-center`} scrollbar-thin scrollbar-webkit`} style={{overflow: 'auto'}}>
                            {posts !== null && category === 'All' &&
                                Object.keys(posts).map((category, id) => <PostItemList key={id} category={category} posts={posts[category]} />
                                )
                            }
                            {posts !== null && category !== 'All' &&
                                <PostItemList category={category} posts={posts[category]} />
                            }
                    </div>
            </MainChild>
    );
    }

export default BlogDropdown;