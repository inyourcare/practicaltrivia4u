import PostList from "@/components/post/list/PostList";
import Image from "next/image";
import Link from "next/link";

export default function Home({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  return (
    <main>
      <div className="flex justify-center itmes-center">
        <div className="w-[80vw]">
          <PostList pageIndex={slug} />
        </div>
      </div>
    </main>
  );
}
