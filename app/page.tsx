"use client";
import Header from "@/components/root/Header";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  // redirect('/edu4u')
  const linkId = "main-page-link-id"
  const router = useRouter()
  useEffect(() => {
    // const link = document.getElementById(
    //   linkId
    // ) as HTMLAnchorElement;
    // link.click();
    router.push('/edu4u')
  }, [router]);
  return (
    <main>
      <header className="w-full flex flex-col py-5 bg-[rgba(35,46,82,0)]">
        <Header />
      </header>
      <Link id={linkId} href="/edu4u"></Link>
    </main>
  );
}
