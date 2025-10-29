import Image from "next/image";
import Images from "../assets/images.jpg";
import {useState} from "react"
import Link from "next/link";

function Header(){

    const isLoggedIn = false;
    return(
    <header className="bg-blue-600 text-white p-4 flex items-center justify-between gap-6 fixed w-full z-20">
        <div className="">
            <h1 className=" font-mono text-xl font-bold transform transition-transform  duration-500 hover:scale-110 cursor-pointer ml-4 ">Yu-Events</h1>
        </div>
        <div className="nav-component font-mono flex justify-between items-center gap-10 mr-5">
            <a className="cursor-pointer transform transition-transform duration-200 hover:-translate-y-1.5">Events</a>
            <a className="cursor-pointer transform transition-transform duration-200 hover:-translate-y-1.5">Clubs</a>
            <a className="cursor-pointer transform transition-transform duration-200 hover:-translate-y-1.5">About</a>
            <a className="cursor-pointer transform transition-transform duration-200 hover:-translate-y-1.5">Contact</a>
            <div>
                {isLoggedIn ? ( <Image src={Images} 
                alt="profile picture"
                width={40}
                className="rounded-full cursor-pointer"
                ></Image>) : (<div className="flex gap-2"><Link href="/login" className="inline-block cursor-pointer transform transition-transform duration-200 hover:-translate-y-1.5">Log In</Link> 
                              <p>/</p>
                              <Link href="/signup" className="inline-block cursor-pointer transform transition-transform duration-200 hover:-translate-y-1.5">Sign Up</Link>
                              </div>
                )}
                
            </div>
        </div>

    </header>);
}
export default Header