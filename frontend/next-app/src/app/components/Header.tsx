"use client"
import {useEffect, useState} from "react"
import Image from "next/image";
import Images from "@/app/assets/images.jpg";
import Link from "next/link";
import HeaderEvents from "./HeaderEvents";
import { useAuth } from "../events/event-feed/[eventID]/components/userAuth";

function Header() {
  const {isLoggedIn, user, token} = useAuth();

  return (
    <header className="sticky top-0 bg-gradient-to-br from-black to-blue-800 text-white p-4 flex items-center justify-between gap-6 w-full z-20">
      <div className="">
        <h1 className=" font-mono text-xl font-bold transform transition-transform  duration-500 hover:scale-110 cursor-pointer ml-4 ">
          <Link href="/">YU-Events</Link>
        </h1>
      </div>
      <div className="nav-component font-mono flex justify-between items-center gap-10 mr-5">
        <HeaderEvents />
        <Link
          className="cursor-pointer transform transition-transform duration-200 hover:-translate-y-1.5"
          href="/clubs"
        >
          Clubs
        </Link>
        <Link
          className="cursor-pointer transform transition-transform duration-200 hover:-translate-y-1.5"
          href="/about"
        >
          About
        </Link>
        <Link
          className="cursor-pointer transform transition-transform duration-200 hover:-translate-y-1.5"
          href="/contact"
        >
          Contact
        </Link>
        <div>
          {isLoggedIn ? (
            <Image
              src={Images}
              alt="profile picture"
              width={40}
              className="rounded-full cursor-pointer"
            ></Image>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="inline-block cursor-pointer transform transition-transform duration-200 hover:-translate-y-1.5"
              >
                Log In
              </Link>
              <p>/</p>
              <Link
                href="/signup"
                className="inline-block cursor-pointer transform transition-transform duration-200 hover:-translate-y-1.5"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;