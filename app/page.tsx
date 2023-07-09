import Header from "@/components/root/Header";
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/edu4u')
  return (
    <main>
      <header className="w-full flex flex-col py-5 bg-[rgba(35,46,82,0)]">
        <Header />
      </header>
    </main>
  );
}
