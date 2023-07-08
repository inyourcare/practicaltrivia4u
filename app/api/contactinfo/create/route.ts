import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, ContactInfo } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const contactinfo = await prisma.contactInfo
    .create({
      data: {
        // ...req.body,
        ...body,
      },
    })
  console.log(contactinfo);
  await prisma.$disconnect();
  return NextResponse.json({ result: contactinfo });
}