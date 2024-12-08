import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { getPostData } from "@/lib/posts/posts";

const PostPage = async ({ params }: { params: { slug: string } }) => {
    const postData = await getPostData(params.slug);

    console.log("Rendered Content HTML:", postData.contentHtml);

    return (
        <div className="childFirst min-w-screen min-h-screen">
            <section className="mx-auto w-full md:w-full p-9 flex flex-col gap-9">
                <div className="flex justify-between font-poppins">
                    <Link href={"/blog"} className="flex flex-row gap-1 place-items-center">
                        <ArrowLeftIcon width={20} />
                        <p>Back</p>
                    </Link>
                    <p>{postData.date.toString()}</p>
                </div>
                <article className="article w-10/12 self-center" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </section>
        </div>
    );
};

export default PostPage;