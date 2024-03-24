import BlogDropdown from "@/components/dropdown/blog/blogdropdown";
import { getCategorisedPosts } from "@/lib/posts";

const Blog = () => {
    const posts = getCategorisedPosts();
    const categoriesForDrop = Object.keys(posts).map((category) => category).sort((a, b) => a < b ? -1 : 1);
    
    return (
        <section className="flex flex-col gap-5">
            <BlogDropdown categoriesForDrop={categoriesForDrop} posts={posts} />
        </section>
    );
};

export default Blog;