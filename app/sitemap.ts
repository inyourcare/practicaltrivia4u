import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${process.env.NEXT_PUBLIC_HOST_BASE_URL}/ask` }, //ask
    { url: `${process.env.NEXT_PUBLIC_HOST_BASE_URL}/fun/food_roulette` }, //fun
    { url: `${process.env.NEXT_PUBLIC_HOST_BASE_URL}/edu4u` }, //edu4u
    { url: `${process.env.NEXT_PUBLIC_HOST_BASE_URL}/edu4u/english` }, //english
    { url: `${process.env.NEXT_PUBLIC_HOST_BASE_URL}/edu4u/enrichment` }, //enrichment
    { url: `${process.env.NEXT_PUBLIC_HOST_BASE_URL}/edu4u/korean` }, //korean
    { url: `${process.env.NEXT_PUBLIC_HOST_BASE_URL}/edu4u/math` }, //math
    { url: `${process.env.NEXT_PUBLIC_HOST_BASE_URL}/partners/goodo` }, //goodo
    { url: `${process.env.NEXT_PUBLIC_HOST_BASE_URL}/partners/howcoding` }, //howcoding
    { url: `${process.env.NEXT_PUBLIC_HOST_BASE_URL}/partners/mindfulness` }, //mindfulness
    { url: `${process.env.NEXT_PUBLIC_HOST_BASE_URL}/partners/power` }, //power
    { url: `${process.env.NEXT_PUBLIC_HOST_BASE_URL}/partners/sangsang` }, //sangsang
    { url: `${process.env.NEXT_PUBLIC_HOST_BASE_URL}/partners/wawa` }, //wawa
    { url: `${process.env.NEXT_PUBLIC_HOST_BASE_URL}/post/list/0` }, //post
  ];
  // const files = getWawaFiles();
  // const wawas = getFiles(GetFilesFileType.wawa);
  // const posts = getFiles(GetFilesFileType.post);

  // return wawas
  //   .map((wawa) => {
  //     return { url: `${process.env.HOST_BASE_URL}/intro/wawa/${wawa}` }; //wawa
  //   })
  //   .concat(
  //     { url: `${process.env.HOST_BASE_URL}/about` }, //about
  //     { url: `${process.env.HOST_BASE_URL}/fun/food_roulette` }, //fun
  //     { url: `${process.env.HOST_BASE_URL}/intro/goodo` }, //goodo
  //     { url: `${process.env.HOST_BASE_URL}/intro/howcoding` }, //howcoding
  //     { url: `${process.env.HOST_BASE_URL}/intro/sangsang` }, //sangsang
  //     posts.map((post) => {
  //       return { url: `${process.env.HOST_BASE_URL}/post/${post}` }; //post
  //     })
  //   );
  // return [
  //   {
  //     url: "https://acme.com/about",
  //     lastModified: new Date(),
  //   } as {
  //     url: string;
  //     lastModified?: string | Date | undefined;
  //   },
  //   {
  //     url: "https://acme.com/about",
  //     lastModified: new Date(),
  //   },
  //   {
  //     url: "https://acme.com/blog",
  //     lastModified: new Date(),
  //   },
  // ];
}
