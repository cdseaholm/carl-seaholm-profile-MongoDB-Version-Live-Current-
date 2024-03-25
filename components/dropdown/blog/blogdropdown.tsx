'use client'

import { Dropdown } from "@nextui-org/react";
import useMediaQuery from "../../listeners/WidthSettings";
import { useState } from "react";
import PostItemList from "../../posts/postlistitem";
import type { post } from "../../../types/post";
import MobileBlogDropdown from "./mobileblogdrop";

const BlogDropdown = ({categoriesForDrop, posts}: {categoriesForDrop: Array<string>; posts: Record<string, post[]>}) => {
    const isBreakpoint = useMediaQuery(768);
    const [contextName, setContextName] = useState('All' as string);

    return (
        <>
        {isBreakpoint && 
            <MobileBlogDropdown categoriesForDrop={categoriesForDrop} posts={posts} />
        }
        {!isBreakpoint &&
        <>
        <header className="font-cormoratnGaramond text-6xl text-neutral-900 text-center">
                <h1 className="underline text-4xl">Blog</h1>
            </header>
        <div className='flex justify-end pt-5 py-5'>
                  <div className='flex flex-col'>
                <Dropdown>
                    {categoriesForDrop}
                </Dropdown>
        </div>
        </div>
        <section className="md:grid md:grid-cols-2 flex flex-col gap-10">
                {posts !== null && contextName === 'All' &&
                    Object.keys(posts).map((category, id) => <PostItemList key={id} category={category} posts={posts[category]} />
                    )
                }
                {posts !== null && contextName !== 'All' &&
                    <PostItemList category={contextName} posts={posts[contextName]} />
                }
        </section>
        </>
        }
        </>
    );
    }

export default BlogDropdown;