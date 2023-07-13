import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, ContactInfo } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug; // 'a', 'b', or 'c'
  console.log("post get api - request slug::", slug);
  const post = await prisma.post.findUnique({
    where: {
      id: Number(slug),
    },
  });

  await prisma.$disconnect();
  if (post) {
    console.log("findPost,", post.id);
    return NextResponse.json({ post });
  }
  return NextResponse.json({ err: "not found post" });
}
