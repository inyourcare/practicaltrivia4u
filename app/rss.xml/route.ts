import Rss from "rss";

// import { getArticles } from "@/data/article.data";
import generateRssFeed from "@/components/util/generateRssFeed";

const SITE_URL = "http://localhost:3000";

export async function GET() {
  // const articles = await getArticles();

  // const feed = new Rss({
  //   title: "Example blog",
  //   description: "Lorem ipsum dolor sit amet.",
  //   feed_url: `${SITE_URL}/rss.xml`,
  //   site_url: SITE_URL,
  //   language: "en",
  // });

  // articles.forEach((article) => {
  //   feed.item({
  //     title: article.title,
  //     description: article.description,
  //     url: `${SITE_URL}/blog/${article.slug}`,
  //     guid: `${SITE_URL}/blog/${article.id}`,
  //     date: article.publishedAt,
  //   });
  // });

  const feed = await generateRssFeed()
  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
