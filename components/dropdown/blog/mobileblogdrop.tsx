'use client'

import useMediaQuery from "../../listeners/WidthSettings";
import { MobileDropDown } from "../mobileDropdown";
import { useState } from "react";
import type { post } from "../../../types/post";
import MobilePostItemList from "@/components/posts/mobilepostitemlist";

const MobileBlogDropdown = ({categoriesForDrop, posts}: {categoriesForDrop: Array<string>; posts: Record<string, post[]>}) => {

    const [contextName, setContextName] = useState('All');

    return (
        <>
        <header className="font-cormoratnGaramond text-6xl text-neutral-900 text-center">
                <h1 className="underline text-2xl">Blog</h1>
        </header>
        <div className='flex justify-end pt-5 py-5'>
            <div className='flex flex-col'>

                <p className="absolute right-15 pl-5 top-20 mt-20 pt-2 text-sm text-black">Filter:</p>

                <MobileDropDown 
                    menuStyle={`absolute right-2 z-30 py-1 px-1 text-left border border-gray-300 rounded-sm mt-9 mb-0 bg-clip-padding bg-slate-800/70 text-white shadow-lg w-30 cursor-pointer`} 
                    dropdownStyle={`absolute right-20 z-10 flex w-30 text-black rounded bg-slate-300 text-sm justify-between`}
                    itemsToFilter={categoriesForDrop} 
                    setContextName={(name: string) => () => setContextName(name)}
                    starterName={contextName} />
            </div>
        </div>
        <section className="md:grid md:grid-cols-2 flex flex-col gap-10">
                {posts !== null && contextName === 'All' &&
                    Object.keys(posts).map((category, id) => <MobilePostItemList key={id} category={category} posts={posts[category]} />
                    )
                }
                {posts !== null && contextName !== 'All' &&
                    <MobilePostItemList category={contextName} posts={posts[contextName]} />
                }
        </section>
        </>
    );
    }

export default MobileBlogDropdown;