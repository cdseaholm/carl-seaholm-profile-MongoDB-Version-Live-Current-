import Link from 'next/link';
import type { post } from '@/models/types/post';

export default function PostItemList({ category, posts }: { category: string; posts: post[] }) {
    const sortedPosts = posts.sort((a, b) => a.title < b.title ? -1 : 1);

    return (
        <div className='flex border border-black shadow-lg m-2 px-2 rounded-md w-full h-full bg-slate-800/50'>
            <div className='flex flex-col gap-5'>
                <h2 className='text-2xl font-cormorantGaramond underline text-neutral-300'>{category}</h2>
                <div className='flex flex-col gap-2.5 pb-5 text-base'>
                    {sortedPosts.map((post, id) => (
                        <Link href={`/${post.id}`} key={id} className='text-neutral-300 hover:text-amber-700 transition duration-150'>
                            -{post.title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
