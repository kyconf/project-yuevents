import Link from "next/link";
import Image from "next/image";
import React from "react";
import HeaderEvents from "@/app/components/HeaderEvents";

/**
 * @returns The header element used in many default pages
 */
const EventFeedPage = () => {
  // Replace the Link tags with new components if we decide that they should have hover menus, like Events
  // How should the user icon and subsequent drop down menu look like when logged in or as a guest?
  return (
    <header className="flex items-center bg-blue-400 border-b-2 border-b-black p-3 px-5 space-x-15 font-sans font-bold">
      <Link href="/" className="text-2xl grow-1">
        YUEvents
      </Link>
      {/*Add drop down menu when hidden*/}
      <nav className="hidden md:flex space-x-15 text-xl">
        <HeaderEvents />
        <Link href="/clubs">Clubs</Link>
        <Link href="/About">About</Link>
        <Link href="/Contact">Contact</Link>
      </nav>
      <Image src="/favicon.ico" alt="" width={40} height={40} />
    </header>
  );
};

export default EventFeedPage;
