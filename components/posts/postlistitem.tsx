import Link from 'next/link';
import type { post } from '@/models/types/post';

export default function PostItemList({ category, posts }: { category: string; posts: post[] }) {
    const sortedPosts = posts.sort((a, b) => a.title < b.title ? -1 : 1);
    const rows = Math.ceil(sortedPosts.length / 2);
    return (
        <div className='flex flex-col justify-start items-start p-2 rounded-md w-full h-full gap-5 border-b border-neutral-500/80'>
            <h2 className='md:text-2xl text-base font-cormorantGaramond underline text-black'>{category}</h2>
            <div className={`grid grid-cols-2 grid-rows-${rows} w-full h-full`}>
                {sortedPosts.map((post, id) => (
                    <Link href={`/${post.id}`} key={id} className='text-neutral-700 hover:text-amber-700 transition duration-150 py-2 text-xs md:text-base'>
                        <li>{post.title}</li>
                    </Link>
                ))}
            </div>
        </div>
    );
};
