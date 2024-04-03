import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { getPostData } from "@/lib/posts/posts";

const PostPage = async ({ params }: { params: { slug: string } }) => {
    
    const postData = await getPostData(params.slug);

    return (
        <div className="childFirst min-w-screen min-h-screen my-10 mx-10">
            <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5">
                <div className="flex justify-between font-poppins">
                    <Link href={"/blog"} className="flex flex-row gap-1 place-items-center">
                        <ArrowLeftIcon width={20} />
                        <p>Back</p>
                    </Link>
                    <p>{postData.date.toString()}</p>
                </div>
                <article className="article" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </section>
        </div>
    )
};

export default PostPage;