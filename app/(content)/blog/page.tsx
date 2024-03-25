import BlogDropdown from "@/components/dropdown/blog/blogdropdown";
import { getCategorisedPosts } from "@/lib/posts";

const Blog = () => {
    const posts = getCategorisedPosts();
    const categoriesForDrop = Object.keys(posts);
    categoriesForDrop.push('All');
    const catSort = categoriesForDrop.sort((a, b) => a < b ? -1 : 1).filter(category => category !== 'demo');
    
    return (
        <section className="flex flex-col gap-5">
            <BlogDropdown categoriesForDrop={catSort} posts={posts} />
        </section>
    );
};

export default Blog;