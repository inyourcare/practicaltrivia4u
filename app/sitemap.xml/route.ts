const getPostList = async (page: number = 0, limit: number = 100000) => {
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
      // cache: "no-cache",
      next: { revalidate: 60 },
    }
  );
  // console.log(await res.json());
  return res.json();
};

// const URL = "https://claritydev.net";

async function generateSiteMap() {
  const { posts, pages } = await getPostList();
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${process.env.NEXT_PUBLIC_HOST_BASE_URLL}</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_HOST_BASE_URL}/ask</loc>
     </url>
      <url>
       <loc>${process.env.NEXT_PUBLIC_HOST_BASE_URL}/fun/food_roulette</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_HOST_BASE_URL}/edu4u</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_HOST_BASE_URL}/edu4u/english</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_HOST_BASE_URL}/edu4u/enrichment</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_HOST_BASE_URL}/edu4u/korean</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_HOST_BASE_URL}/edu4u/math</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_HOST_BASE_URL}/partners/goodo</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_HOST_BASE_URL}/partners/howcoding</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_HOST_BASE_URL}/partners/mindfulness</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_HOST_BASE_URL}/partners/power</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_HOST_BASE_URL}/partners/sangsang</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_HOST_BASE_URL}/partners/wawa</loc>
     </url>
     ${
       posts &&
       (posts as Array<any>)
         .map((post) => {
           return `
           <url>
               <loc>${`${process.env.NEXT_PUBLIC_HOST_BASE_URL}/post/detail/${post.id}`}</loc>
           </url>
         `;
         })
         .join("")
     }
   </urlset>
 `;
}

export async function GET() {
  const sitemap = await generateSiteMap();
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
