const Blog = () => {
    return (
        <div className="flex justify-evenly flex-col items-center space-y-4">
            <h1 className="text-2xl font-bold">Blog</h1>
            
                <div className="w-1/4 absolute left-5 bottom-50 top-50">
                    <h2 className="font-semibold">Recent Posts</h2>
                    {/* Replace this with your list of recent posts */}
                    <ul>
                        <li>Post 1</li>
                        <li>Post 2</li>
                        <li>Post 3</li>
                        <li>Post 4</li>
                        <li>Post 5</li>
                    </ul>
                </div>
                <div className="w-1/2 overflow-auto">
                    <h2 className="font-semibold">Body of Most Recent Post</h2>
                    {/* Replace this with the body of the most recent post */}
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.</p>
                </div>
        </div>
    );
};

export default Blog;