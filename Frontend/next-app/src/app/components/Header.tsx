import Link from "next/link";
import Image from "next/image";
import React from "react";
import HeaderEvents from "@/app/components/HeaderEvents";

/**
 *
 * @returns The header element used in many default pages
 */
const EventFeedPage = () => {
  // Replace the Link tags with new components if we decide that they should have hover menus, like Events
  // How should the user icon and subsequent drop down menu look like when logged in or as a guest?
  return (
    <header className="flex justify-between items-center border-b-2 border-b-gray-400 p-3 mx-5 space-x-15 font-sans font-bold">
      <div className="text-2xl">
        <Link href="/">YUEvents</Link>
      </div>
      <div className="flex items-center space-x-15 text-xl">
        <HeaderEvents />
        <Link href="/clubs">Clubs</Link>
        <Link href="/About">About</Link>
        <Link href="/Contact">Contact</Link>
        <Image src="/favicon.ico" alt="" width={40} height={40}></Image>
      </div>
    </header>
  );
};

export default EventFeedPage;

// Events, Clubs, About, Contact, img
