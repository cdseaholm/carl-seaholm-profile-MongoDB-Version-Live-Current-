import BlogDropdown from "@/components/dropdowns/blogdropdown";
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import { useUserStore } from "@/context/userStore";
import { getCategorisedPosts } from "@/lib/posts/posts";
import { post } from "@/models/types/post";
import { IUser } from "@/models/types/user";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const userInfo = useUserStore.getState().userInfo as IUser;
    const userName = userInfo ? userInfo.email : '';

    return {
        title: `${userName}'s Blog`,
        description: `A page dedicated to the blog ${userName} had written.`,
    };
}

export default async function Page() {
    const posts = getCategorisedPosts();
    Object.keys(posts).forEach(category => {
        if (!category) {
            return;
        }
        posts[category] = posts[category]?.filter(post => post.category !== 'demo').sort((a, b) => a.title < b.title ? 1 : -1) as post[];
        if (posts[category]?.length === 0) {
            delete posts[category];
        }
    });
    const categoriesForDrop = Object.keys(posts);
    const catSort = categoriesForDrop.sort((a, b) => a < b ? -1 : 1).filter(category => category !== 'demo');

    return (
        <MainPageBody>
            <BlogDropdown categoriesForDrop={catSort} posts={posts} />
        </MainPageBody>
    );
};