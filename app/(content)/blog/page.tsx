import BlogDropdown from "@/components/dropdowns/blogdropdown";
import { getCategorisedPosts } from "@/lib/posts/posts";
import { post } from "@/models/types/post";

const Blog = () => {
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
        <section className="mb-5 h-full w-full">
            <BlogDropdown categoriesForDrop={catSort} posts={posts} />
        </section>
    );
};

export default Blog;