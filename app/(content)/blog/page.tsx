import BlogDropdown from "@/components/dropdown/blogdropdown";
import { getCategorisedPosts } from "@/lib/posts/posts";

const Blog = () => {
    const posts = getCategorisedPosts();
    Object.keys(posts).forEach(category => {
        posts[category] = posts[category].filter(post => post.category !== 'demo').sort((a, b) => a.title < b.title ? 1 : -1);
        if (posts[category].length === 0) {
            delete posts[category];
        }
    });
    const categoriesForDrop = Object.keys(posts);
    categoriesForDrop.push('All');
    const catSort = categoriesForDrop.sort((a, b) => a < b ? -1 : 1).filter(category => category !== 'demo');
    
    return (
        <section className="mb-5">
            <BlogDropdown categoriesForDrop={catSort} posts={posts} />
        </section>
    );
};

export default Blog;