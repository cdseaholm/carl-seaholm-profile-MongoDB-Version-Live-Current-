'use client'

import { useState } from "react";
import PostItemList from "@/components/posts/postlistitem";
import type { post } from "@/types/post";
import React from "react";
import InnerHeader from "@/components/pagetemplates/innerheader/InnerHeader";
import MainChild from "../pagetemplates/mainchild/mainchild";
import useMediaQuery from "../listeners/WidthSettings";
import { useSession } from "@/app/context/session/SessionContext";

const BlogDropdown = ({categoriesForDrop, posts}: {categoriesForDrop: Array<string>; posts: Record<string, post[]>}) => {
    const isBreakpoint = useMediaQuery(768);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('All');
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLDivElement>(null);
    const { user } = useSession();
    const hasShownSubscriptionPrompt = React.useRef(false);

    React.useEffect(() => {
        if (user === null && !hasShownSubscriptionPrompt.current) {
            hasShownSubscriptionPrompt.current = true;
            const newSub = window.confirm('Would you like to Subscribe to this blog?');
            if (newSub === true) {
                const email = window.prompt('Please enter your email:');
                if (email) {
                    const password = window.prompt('Create a password to verify your email:')
                    if (password) {
                        const formData = new FormData();
                        formData.append('email', email);
                        formData.append('password', password);
                        {/**createUser({ formData }).then(newUser => {
                            if (newUser !== null && typeof newUser !== 'string') {
                                createBlogSub({user: newUser[0]})
                                .then((sub) => console.log(sub))
                                .catch((e) => console.error(e));
                            }
                        });*/}
                    }
                    console.log(`Subscribing user with email: ${email}`);
                }
            } else {
                console.log('User declined to subscribe');
            }
        } else if (user !== null && user.blogsub === false && !hasShownSubscriptionPrompt.current) {
            const sub = window.confirm('Would you like to subscribe to this blog?');
            {/**if (sub) {
                createBlogSub({user}).then(subscriber => {
                    if (subscriber === 'Subbed') {
                        console.log('Subscribed user');
                    }
                    console.log('Subscribing user');
                });
            }*/}
        }
    }, [user]);

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
    }, [dropdownRef, open, setOpen, buttonRef]);

    return (
        <>
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
            <MainChild>
                <div className="flex flex-col items-center justify-center">
                    <div className={`${category === 'All' || !isBreakpoint ? `md:grid md:grid-cols-2 justify-center` : `flex flex-col items-center`}`}>
                            {posts !== null && category === 'All' &&
                                Object.keys(posts).map((category, id) => <PostItemList key={id} category={category} posts={posts[category]} />
                                )
                            }
                            {posts !== null && category !== 'All' &&
                                <PostItemList category={category} posts={posts[category]} />
                            }
                    </div>
                </div>
            </MainChild>
            </>
    );
    }

export default BlogDropdown;