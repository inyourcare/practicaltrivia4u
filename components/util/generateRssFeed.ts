import RSS from "rss";
// import fs from "fs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function generateRssFeed() {
  //  const site_url = 'localhost:3000';
  const site_url = "practicaltrivia.com";

  const feedOptions = {
    title: "PracticalTrivia | RSS feed",
    description: "Welcome to this blog posts!",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, 실용주의 잡학사전`,
  };

  const feed = new RSS(feedOptions);
  const posts = await prisma.post.findMany({ where: { enable: true } });
  posts.map(post=>{
    feed.item({
      title: post.title,
      description: post.description,
      url: `${site_url}/post/detail/${post.id}`,
      date: post.createdAt,
    });
  })
  // const files = getFiles(GetFilesFileType.post);
  // files
  //   .filter((file) => file.endsWith(".md"))
  //   .map((file) => {
  //     const post = getPostContent(file);
  //     feed.item({
  //       title: post.data.title,
  //       description: post.data.description,
  //       url: `${site_url}/post/${post}`,
  //       date: post.data.date,
  //     });
  //   });

  return feed;
  // fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}
