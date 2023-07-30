// import { hashPassword } from '@core/password'
// import sha256 from "crypto-js/sha256";
import { PrismaClient } from "@prisma/client";
import { branchData } from "./branches";
import { postData } from "./posts";
import { exportWords } from "./word";
// import { ROLE } from './types'
// const hashPassword = (password: string) => {
//     return sha256(password).toString();
// };
const prisma = new PrismaClient();
async function main() {
  const branches = await prisma.wawaBranches.createMany({
    data: branchData,
    skipDuplicates: true,
  });
  console.log('branches',branches);

  const posts = await prisma.post.createMany({
    data: postData,
    skipDuplicates: true,
  });
  console.log('posts',posts);

  const words = await prisma.word.createMany({
    data: exportWords,
    skipDuplicates: true,
  });
  console.log('words',words)
  
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
