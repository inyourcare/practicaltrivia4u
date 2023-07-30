import fs from 'fs'
// import matter from "gray-matter";

const getWords = () => {
  const folder = "data/english/word";
  const wordFiles = fs.readdirSync(folder)
  return wordFiles.map(fileName=>{
    const words = fs.readFileSync(`${folder}/${fileName}`, "utf8");
    return [fileName,words]
  })
};
let dbWords = new Array<any>();
(getWords() as Array<any>).map((fileWord) => {
  const fileName = fileWord[0] as string;
  const content = (fileWord[1] as string)
    .replace(/(?:\t)/g, " ")
    .replace(/(?:\r\n|\r|\n)/g, "<br />")
    .split("<br />")
    .map((s) => {
      const splits = s.trim().split(" ");
      const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      let i = 0;
      for (; i < splits.length; i += 1)
        if (korean.test(splits[i]) === true) break;
      return {
        spell: splits.slice(0, i).join(" "),
        korean: splits.slice(i).join(" "),
        level: fileName.split('.')[0]
      };
    });
  // console.log(fileName, content);
  dbWords = dbWords.concat(content)
});
// console.log('dbWords',dbWords)

export const exportWords = dbWords