import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaBlogger,
} from "react-icons/fa";
import Nav from "./nav/Nav";

function Header() {
  return (
    <div className="container flex flex-col items-center  sm:flex-col md:flex-row  lg:flex-row  xl:flex-row  2xl:flex-row justify-center sm:justify-center md:justify-between lg:justify-between xl:justify-between 2xl:justify-between mx-auto py-3 px-0 sm:px-0 md:px-3 lg:px-3 xl:px-3 2xl:px-3 my-4">
      <a href="/" className="text-2xl text-center ">
        <Image
          width={543}
          height={460}
          style={{ width: 200, height: 150 }}
          src={`/images/logo/practical4u-logo2.png`}
          priority
          alt=""
        />
      </a>

      <Nav/>
      
      <div className="hidden sm:hidden md:hidden lg:flex xl:flex 2xl:flex flex-row justify-between items-center">
        <Link href="#" target="_blank" aria-disabled>
          {" "}
          <FaFacebookF className="mx-3 " />{" "}
        </Link>
        <Link href="#" target="_blank" aria-disabled>
          {" "}
          <FaInstagram className="mx-3 " />{" "}
        </Link>
        <Link href="https://blog.naver.com/hellothankyoubye" target="_blank">
          {" "}
          <FaBlogger className="mx-3 " />{" "}
        </Link>
        <Link
          href="https://www.youtube.com/channel/UCrNg2TpybX3TRVK45DhZgdA"
          target="_blank"
        >
          {" "}
          <FaYoutube className="mx-3 " />{" "}
        </Link>

        <button
          type="button"
          className="px-5 mx-auto py-2.5 w-[150px] gap-2.5 inline-flex flex-col justify-center items-center rounded-lg text-center font-medium bg-[#dce8fc] text-[rgba(35,46,82,1)]"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default Header;