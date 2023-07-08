import fs from "fs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // const body = await request.json();
  const filename = request.url.split('?')[1]?.split('filename=')[1]
  console.log("file api - request filename::", filename);

  // const filename = 'texas_AM_Univ_pdf'

  const folder = "data/";
  const files = fs.readdirSync(folder);

  if (files.filter((file) => file == `${filename}.pdf`).length === 0)
    return NextResponse.json({ message: "not found filename" });

  const fileContents = new Buffer(
    fs.readFileSync(`data/${filename}.pdf`, "binary"),
    "binary"
  );

  const response = new Response(fileContents);
  response.headers.set("Content-Type", "application/pdf");
  response.headers.set("Content-Disposition", `attachment; filename=${filename}.pdf`);

  return response;
}
