import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, ContactInfo } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  console.log("wawaBranches list api - request body::", body);
  const { page, limit, lastId, conditions } = body;
  console.log(
    "wawaBranches list api - page,limit,conditions",
    page,
    limit,
    conditions
  );

  const whereConditions = {
    ...conditions,
  };
  const wawaBranches = await prisma.wawaBranches.findMany({
    ...(page && limit && { skip: page * limit }),
    ...(limit && { take: limit }),
    ...(lastId && { skip: 1, cursor: { id: lastId } }),
    select: {
      id: true,
      name: true,
      englishName: true,
      lat: true,
      lng: true,
      // role: true,
      createdAt: true,
      updatedAt: true,
    },
    where: whereConditions,
    // where: {
    //     creator: {
    //         email: 'admin@sotong.co.kr'
    //     }
    // },
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        name: "asc",
      },
    ],
    // include: {
    //     creator: {
    //         select: {
    //             name: true, email: true, image: true, role: true
    //         }
    //     },
    //     modifier: {
    //         select: {
    //             name: true, email: true, image: true, role: true
    //         }
    //     }
    // }
  });
  console.debug("wawaBranches list api result", wawaBranches.length);
  const total = await prisma.wawaBranches.count({
    where: whereConditions,
    // where: {
    //     creator: {
    //         email: 'admin@sotong.co.kr'
    //     }
    // }
  });
  const pages = {
    curPage:
      total === 0
        ? 1
        : Math.floor(total / limit) + (total % limit === 0 ? 0 : 1),
    total: total,
    limit: limit,
  };
  // res.status(200).json({ contactinfos, pages });

  // console.log(contactinfo);
  await prisma.$disconnect();
  return NextResponse.json({ wawaBranches, pages });
}
