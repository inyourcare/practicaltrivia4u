// "use client";

import { useEffect, useState } from "react";
import PostPreview from "../preview/PostPreview";
import Pagination from "./Pagination";
import Spinner from "@/components/spinner/Spinner";


const getData = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/post/${id}`,
    // `/api/post/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // cache: process.env.NODE_ENV !== "development" && "default" || "no-cache"
      cache: "no-cache",
      next: { revalidate: 10 },
    }
  );
  // console.log(await res.json());
  return res.json();
};
const getPostList = async (page: number = 0, limit: number = 10) => {
  const res = await fetch(
  // `/api/post/list`, 
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
    // cache: process.env.NODE_ENV !== "development" && "default" || "no-cache",
    cache: 'no-cache',
    next: { revalidate: 60 },
  });
  // console.log(await res.json());
  return res.json();
};
export default async function PostList({ pageIndex }: { pageIndex: string }) {
  const { posts, pages } = await getPostList(Number(pageIndex));
  // const [posts, setPosts] = useState(null as unknown as Array<any>);
  // const [pages, setPages] = useState(null as unknown as {});
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   setIsLoading(true);
  //   getPostList(Number(pageIndex))
  //     .then((data) => {
  //       console.log(data);
  //       // const [posts, pages] = data;
  //       if (data.posts && data.pages) {
  //         setPosts(data.posts);
  //         setPages(data.pages);
  //       }
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, [pageIndex]);
  return (
    <>
      {/* {isLoading && <Spinner />} */}
      {posts &&
        (posts as Array<any>).map((post) => (
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
      {pages && (
        <Pagination
          pages={
            pages as {
              page: number;
              totalPageCount: number;
              limit: number;
              total: number;
            }
          }
        />
      )}
    </>
  );
}
