"use client";

import { useEffect, useState } from "react";
import PostPreview from "../preview/PostPreview";
import Pagination from "./Pagination";

export default function PostList() {
  const [posts, setPosts] = useState(new Array());
  const [pages, setPages] = useState({});
  const getPostList = async () =>
    await fetch(`/api/post/list`, {
      method: "POST",
      body: JSON.stringify({
        page: 0,
        limit: 10,
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
    }).then(async (result) => {
      const { posts, pages } = await result.json();
      // console.log(posts, pages);
      return [posts, pages];
    });

  useEffect(() => {
    getPostList().then((data) => {
      const [posts, pages] = data;
      console.log("posts loaded::", posts.length);
      const arr = posts as Array<any>;
      if (arr && arr.length > 0) {
        setPosts(arr);
        setPages(pages);
      }
    });
  }, []);
  return (
    <>
      {posts.map((post) => (
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
        pages={pages as { curPage: number; limit: number; total: number }}
      />
    </>
  );
}
