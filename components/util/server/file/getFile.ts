import fs from "fs";

export enum GetFilesFileType {
  wawa = "wawa",
  post = "post",
}

export function getFiles(type: GetFilesFileType) {
  switch (type) {
    case GetFilesFileType.post:
      const folder = "data/";
      const posts = fs.readdirSync(folder);
      return posts
    case GetFilesFileType.wawa:
      const wawafolder = "app/partners/wawa";
      const wawas = fs.readdirSync(wawafolder);
      return wawas;
    default:
      return []
  }
}
