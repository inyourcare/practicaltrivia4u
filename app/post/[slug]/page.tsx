// "use client";
import Image from "next/image";
import { Metadata } from "next";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
// import { useEffect, useState } from "react";
import parse from 'html-react-parser';

export const getData = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/post/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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

export default async function PostHome({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const { post } = await getData(slug);
  const matterResult = matter(post.contents);
  return (
    <>
      {/* <PostHeader
        title={post.data.title}
        tag={post.data.tags[0]}
        date={dayjs(post.data.date).format("DD MMMM , YYYY")}
        authorName={post.data.author}
        description={post.data.description}
      /> */}

      <div className="my-10 mx-auto">
        <Image
          height="250"
          width="500"
          // src={content.image}
          src={post.image}
          // alt={content.imageAlt}
          alt={post.imageAlt}
          className="mx-auto h-[72%] w-[1424px]"
        />
      </div>

      <div className="my-12 prose prose-stone lg:prose-lg mx-auto">
        {/* {matterResult.content} */}
        {/* <Markdown>{matterResult.content}</Markdown> */}
        {parse(post.contents)}
      </div>
    </>
  );
}
