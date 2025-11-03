"use client";

import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

function LogIn() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const headerVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const signVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };
  const headerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const signRef = useRef<HTMLDivElement>(null);

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please enter all information");
      return;
    }
    try {
      const res = await fetch("", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex-1 flex flex-col  text-blue-200 ml-40 gap-5">
        <motion.h1
          ref={headerRef}
          animate={show ? "visible" : "hidden"}
          variants={headerVariant}
          className="text-6xl font-bold"
        >
          Welcome Back!
        </motion.h1>
        <motion.p
          ref={textRef}
          animate={show ? "visible" : "hidden"}
          variants={textVariant}
          custom={1}
          className="w-xl mt-3"
        >
          {" "}
          Access all your campus events and stay updated with the latest news
          from your school. From workshops, guest lectures, to social
          gatherings, our platform ensures you never miss an opportunity to get
          involved. Please log in to continue{" "}
        </motion.p>
        <motion.div
          ref={textRef}
          animate={show ? "visible" : "hidden"}
          variants={textVariant}
          custom={3}
          className="flex text-2xl gap-10 mt-10 md:mt-5"
        >
          <a href="#" className="hover:text-blue-400 transition">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            <FaInstagram />
          </a>
        </motion.div>
      </div>

      <div className="w-px bg-blue-200 h-100 flex "></div>

      <motion.div
        ref={signRef}
        animate={show ? "visible" : "hidden"}
        variants={signVariant}
        className="flex-1 flex justify-center items-center h-screen mr-40"
      >
        <form className=" p-6 rounded shadow-md h-100 w-100 text-blue-200 ">
          <h2 className="text-5xl font-extralight mb-5 flex justify-center mt-8 ">
            Sign In
          </h2>
          <p>Email Address</p>
          <input
            type="email"
            placeholder="Email"
            className="font-mono border p-2 mb-5 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password</p>
          <input
            type="password"
            placeholder="Password"
            className="font-mono border p-2 mb-1 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex mt-2 gap-2 m-auto">
            <input type="checkbox" name="remember" value="yes"></input>
            <p>Remember me</p>
          </div>
          <div className="flex items-center gap-5">
            <button
              type="submit"
              className="flex mt-5 mb-5 font-mono bg-blue-600 text-white px-4 py-2 rounded cursor-pointer transform transition-transform  duration-500 hover:scale-110"
            >
              Log In
            </button>
            <Link href="/signup" className="hover:underline">
              Create an account?
            </Link>
          </div>
          <a href="#" className="underline">
            Forgot your password?
          </a>
        </form>
      </motion.div>
    </div>
  );
}
export default LogIn;
