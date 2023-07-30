import VoiceRecognition from "@/components/fun/voice_recognition/VoiceRecognition";
import Header from "@/components/root/Header";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function Home() {
  const words = await prisma.word.findMany();
  return (
    <>
      <header className="w-full flex flex-col py-5 bg-[rgba(35,46,82,0)]">
        <Header />
      </header>
      <div className="py-12 flex justify-center">
        <div className="w-full max-w-screen-lg">
          <div className="w-full flex justify-center itmes-center">
            <h1 className="black font-bold">Vocaburary(US)</h1>
          </div>
          <div className="w-full flex p-3 flex-col md:flex-row">
            <VoiceRecognition words={words} />
          </div>
        </div>
      </div>
    </>
  );
}
