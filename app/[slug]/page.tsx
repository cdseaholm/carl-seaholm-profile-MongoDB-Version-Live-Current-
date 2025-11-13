import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { getPostData } from "@/lib/posts/posts";
import ScrollerTemplate from "@/components/pagetemplates/mainpagebody/mainpagebody";

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const postData = await getPostData(slug);

    return postData ? (
        <div className="childFirst min-w-screen h-dvh">
            <ScrollerTemplate>
                <section className="mx-auto w-full md:w-full p-9 flex flex-col gap-9">
                    <div className="flex justify-between font-poppins">
                        <Link href={"/blog"} className="flex flex-row gap-1 place-items-center">
                            <ArrowLeftIcon width={20} />
                            <p>Back</p>
                        </Link>
                        <p>{postData.date.toString()}</p>
                    </div>
                    <article className="article w-10/12 self-center bg-white/80 p-2 rounded-md" dangerouslySetInnerHTML={{ __html: postData.content }} />
                </section>
            </ScrollerTemplate>
        </div>
    ) : (
        'Error getting Post'
    );
};

export default PostPage;