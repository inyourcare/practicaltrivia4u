// "use client";
import Image from "next/image";
// import { Metadata } from "next";
// import Markdown from "markdown-to-jsx";
// import matter from "gray-matter";
// import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import Spinner from "@/components/spinner/Spinner";
import Head from "next/head";
import { Metadata } from "next";
import GoogleAd from "@/components/adsense/GoogleAd";
import { GoogldAdType } from "@/components/adsense/type";
import { redirect } from "next/navigation";

export interface PostMetadata {
  id: string;
  tags: Array<string>;
  category: Array<string>;
  date: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  author: string;
  contents: string;
}

const getData = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/post/${id}`,
    // `/api/post/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // cache: process.env.NODE_ENV !== "development" && "default" || "no-cache"
      // cache: "no-cache",
      next: { revalidate: 10 },
    }
  );
  // console.log(await res.json());
  return res.json();
};

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const slug = params.slug;
  const { post } = await getData(slug);
  return {
    title: post.title,
    description: post.description,
  };
};

export default async function PostHome({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const { post } = await getData(slug);
  if (post.enable === false) {
    // alert('삭제된 포스트 입니다.')
    redirect("/post/list/0");
  }
  // const matterResult = matter(post.contents);
  // const [post, setPost] = useState(null as unknown as PostMetadata);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   setIsLoading(true);
  //   getData(slug)
  //     .then((data) => {
  //       console.log(data);
  //       // const [posts, pages] = data;
  //       if (data.post) {
  //         setPost(data.post);
  //       }
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, [slug]);
  return (
    <>
      {/* <PostHeader
        title={post.data.title}
        tag={post.data.tags[0]}
        date={dayjs(post.data.date).format("DD MMMM , YYYY")}
        authorName={post.data.author}
        description={post.data.description}
      /> */}

      {/* {isLoading && <Spinner />} */}
      {post && (
        <>
          <Head>
            <title>{post.title}</title>
            <meta name="description" content={`${post.description}`} />
          </Head>
          <div className="my-10 mx-auto w-full max-h-[500px] px-20 flex justify-center items-center">
            <Image
              width="500"
              height="250"
              // src={content.image}
              src={post.image}
              // alt={content.imageAlt}
              alt={post.imageAlt}
              className=""
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <h1 className="font-black text-2xl">{post.title}</h1>
          </div>
          <div className="my-12 prose prose-stone lg:prose-lg mx-auto">
            {/* <h1>{post.title}</h1> */}
            {/* {matterResult.content} */}
            {/* <Markdown>{matterResult.content}</Markdown> */}
            {parse(post.contents.replaceAll(
                "<p>_____place_____ad______here______</p>",
                `<div className='googleAd-container w-full overflow-hidden'>
                <ins className="adsbygoogle flex justify-center items-center" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-8425397323378076" data-ad-slot="7670560399"></ins>
                </div>`
              ))}
            {/* {parse(''.replace(
                "<p>_____place_____ad______here______</p>",
                `<ins className="adsbygoogle"
    //  style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8425397323378076"
     data-ad-slot="7670560399"></ins>`
              )
            )} */}

            <GoogleAd type={`${GoogldAdType.Display}`} />
          </div>
        </>
      )}
    </>
  );
}
