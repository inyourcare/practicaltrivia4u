import { NextResponse } from "next/server";
import { GetObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3({
  region: process.env.NEXT_PUBLIC_AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
  },
});
// export { s3Client };

function encode(data: Uint8Array) {
  var str = data.reduce(function (a, b) {
    return a + String.fromCharCode(b);
  }, "");
  return btoa(str).replace(/.{76}(?=.)/g, "$&\n");
}

export async function GET(request: Request) {
  // return NextResponse.json({ test:'test' });
  const key = request.url.split("?")[1]?.split("key=")[1];
  console.log("aws s3 get api key ::", key);
  const input = {
    // GetObjectRequest
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string, // required
    // Key: "test/3.png",
    Key: key,
  };
  const command = new GetObjectCommand(input);
  const obj = await s3Client.send(command);
  // const response = new Response('https://photo.newsen.com/news_photo/2023/01/25/202301250913091510_1.jpg');
  if (obj.Body) {
    const response = new Response(await obj.Body?.transformToByteArray());
    return response;
  } 
}
// export async function POST(request: Request) {
// // export async function GET() {
//   const body = await request.json();
//   console.log(body);
//   const input = {
//     // GetObjectRequest
//     Bucket: process.env.S3_BUCKET_NAME as string, // required
//     Key: "1.png",
//   };
//   const command = new GetObjectCommand(input);

//   const url = await getSignedUrl(s3Client, command, { expiresIn: 300 })
//   // .then(data => {console.log(data)})

//   return NextResponse.json({ url });
//   // return url;
// }
