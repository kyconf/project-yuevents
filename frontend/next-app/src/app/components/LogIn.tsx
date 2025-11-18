"use client";

import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function LogIn() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter all information");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Login failed. Please check your credentials.");
        setIsLoading(false);
        return;
      }

      // Store authentication data in localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem(
        "supabaseAccessToken",
        data.supabase_session.access_token
      );
      localStorage.setItem(
        "supabaseRefreshToken",
        data.supabase_session.refresh_token
      );
      localStorage.setItem(
        "tokenExpiry",
        data.supabase_session.expires_at.toString()
      );

      // Store user data
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("username", data.user.username);

      // Optional: Set cookies for server-side access (if needed)
      document.cookie = `authToken=${data.token}; path=/; max-age=${
        60 * 60 * 24 * 30
      }`; // 30 days
      document.cookie = `userId=${data.user.id}; path=/; max-age=${
        60 * 60 * 24 * 30
      }`;

      // Log to console to verify token storage
      console.log("✅ Login successful!");
      console.log("Token saved:", localStorage.getItem("authToken"));
      console.log("User ID:", localStorage.getItem("userId"));
      console.log("Username:", localStorage.getItem("username"));

      // Redirect to event feed
      router.push("/events/event-feed");
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex-1 flex flex-col text-blue-200 ml-40 gap-5">
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
          Access all your campus events and stay updated with the latest news
          from your school. From workshops, guest lectures, to social
          gatherings, our platform ensures you never miss an opportunity to get
          involved. Please log in to continue
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

      <div className="w-px bg-blue-200 h-100 flex"></div>

      <motion.div
        ref={signRef}
        animate={show ? "visible" : "hidden"}
        variants={signVariant}
        className="flex-1 flex justify-center items-center h-screen mr-40"
      >
        <form
          onSubmit={handleSignIn}
          className="p-6 rounded shadow-md h-100 w-100 text-blue-200"
        >
          <h2 className="text-5xl font-extralight mb-5 flex justify-center mt-8">
            Sign In
          </h2>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <p>Email Address</p>
          <input
            type="email"
            placeholder="Email"
            className="font-mono border p-2 mb-5 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          <p>Password</p>
          <input
            type="password"
            placeholder="Password"
            className="font-mono border p-2 mb-1 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          <div className="flex mt-2 gap-2 m-auto">
            <input type="checkbox" name="remember" value="yes" />
            <p>Remember me</p>
          </div>

          <div className="flex items-center gap-5">
            <button
              type="submit"
              disabled={isLoading}
              className="flex mt-5 mb-5 font-mono bg-blue-600 text-white px-4 py-2 rounded cursor-pointer transform transition-transform duration-500 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? "Logging in..." : "Log In"}
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
