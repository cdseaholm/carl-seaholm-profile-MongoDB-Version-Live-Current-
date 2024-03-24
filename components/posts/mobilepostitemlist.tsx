import Link from 'next/link';
import type { post } from '../../types/post';

export default function MobilePostItemList({ category, posts }: { category: string; posts: post[] }) {
    return (
        <div className='flex flex-col gap-5'>
            <h2 className='text-lg font-cormorantGaramond underline'>{category}</h2>
            <div className='flex flex-col gap-2.5 text-sm'>
                {posts.map((post, id) => (
                    <Link href={`/${post.id}`} key={id} className='text-neutral-900 hover:text-amber-700 transition duration-150'>
                        -{post.title}
                    </Link>
                ))}
            </div>
        </div>
    );
};
