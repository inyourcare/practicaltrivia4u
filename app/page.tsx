"use client";
import Header from "@/components/root/Header";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  // redirect('/edu4u')
  useEffect(() => {
    const link = document.getElementById(
      "main-page-link-id"
    ) as HTMLAnchorElement;
    link.click();
  }, []);
  return (
    <main>
      <header className="w-full flex flex-col py-5 bg-[rgba(35,46,82,0)]">
        <Header />
      </header>
      <Link id="main-page-link-id" href="/edu4u"></Link>
    </main>
  );
}
