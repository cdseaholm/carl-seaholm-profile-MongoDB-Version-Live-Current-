'use client'

import { useState } from "react";
import PostItemList from "@/components/posts/postlistitem";
import type { post } from "@/models/types/post";
import React from "react";
import MainChild from "../pagetemplates/mainchild/mainchild";
import { useSession } from "next-auth/react";
import { useModalStore } from "@/context/modalStore";


const BlogDropdown = ({ categoriesForDrop, posts }: { categoriesForDrop: Array<string>; posts: Record<string, post[]> }) => {

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

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    }

    return (
        <MainChild>
            <section className="w-full h-full flex flex-col pt-16 pb-12">
                <div className="flex flex-row justify-start items-start w-full pb-8">
                    <select defaultValue={'defaultcategory'} onChange={handleCategoryChange} className="bg-transparent cursor-pointer border-0 rounded-md">
                        <option value={'All'}>All categories</option>
                        {categoriesForDrop.map((category, id) => (
                            <option key={id} value={category} className="w-full text-black bg-transparent hover:text-neutral-600 hover:underline">
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={`flex flex-col items-center scrollbar-thin scrollbar-webkit w-full px-24`} style={{ overflow: 'auto', overflowX: 'hidden' }}>
                    {posts !== null && category === 'All' &&
                        Object.keys(posts).map((category, id) => <PostItemList key={id} category={category} posts={posts[category] ? posts[category] : []} />
                        )
                    }
                    {posts !== null && category !== 'All' &&
                        <PostItemList category={category} posts={posts[category] ? posts[category] : []} />
                    }
                </div>
            </section>
        </MainChild>
    );
}

export default BlogDropdown;