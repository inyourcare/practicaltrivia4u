// "use client";

// import { useEffect, useState } from "react";
import PostPreview from "../preview/PostPreview";
import Pagination from "./Pagination";

export const getPostList = async (page:number = 0,limit:number = 10) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/post/list`,
    {
      method: "POST",
      body: JSON.stringify({
        page: page,
        limit: limit,
        // conditions: {
        // creator: {
        // email: 'admin@sotong.co.kr'
        // email
        //     ...(email && { email: email })
        // }
        // }
        // conditions
        conditions: {},
      }),
      headers: { "Content-Type": "application/json" },
      cache: process.env.NODE_ENV !== "development" && "default" || "no-cache"
    }
  );
  // console.log(await res.json());
  return res.json();
};
export default async function PostList({pageIndex}:{pageIndex:string}) {
  const { posts, pages } = await getPostList(Number(pageIndex));
  return (
    <>
      {(posts as Array<any>).map((post) => (
        <PostPreview
          key={post.id}
          id={post.id}
          tags={post.tags}
          category={post.category}
          description={post.description}
          date={post.createdAt}
          title={post.title}
          image={post.image}
          imageAlt={post.imageAlt}
          author={post.author}
        />
      ))}
      <Pagination
        pages={pages as { page:number ,totalPageCount: number; limit: number; total: number }}
      />
    </>
  );
}
