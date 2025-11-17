"use client";

import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignUp() {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 150);
    return () => clearTimeout(timer);
  }, []);

  function handlePassword(
    field: "password" | "confirmPassword",
    value: string
  ) {
    let newPassword = password;
    let newConfirm = confirmPassword;

    if (field === "password") newPassword = value;
    if (field === "confirmPassword") newConfirm = value;

    setPassword(newPassword);
    setConfirmPassword(newConfirm);

    if (newPassword && newConfirm && newPassword !== newConfirm) {
      setError("Passwords unmatch");
    } else {
      setError("");
    }
  }

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

  const handleSignUp = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!email || !name || !username || !password) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          username: username,
          full_name: name,
          email: email,
          password: password,
          role: "user",
          avatar_url: "",
          about: "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Sign up failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // Log success
      console.log("✅ Sign up successful!");
      console.log("Response:", data);

      // Auto-login after signup by calling the login endpoint
      const loginRes = await fetch("http://127.0.0.1:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginRes.json();

      if (loginRes.ok) {
        // Store authentication data
        localStorage.setItem("authToken", loginData.token);
        localStorage.setItem(
          "supabaseAccessToken",
          loginData.supabase_session.access_token
        );
        localStorage.setItem(
          "supabaseRefreshToken",
          loginData.supabase_session.refresh_token
        );
        localStorage.setItem(
          "tokenExpiry",
          loginData.supabase_session.expires_at.toString()
        );
        localStorage.setItem("user", JSON.stringify(loginData.user));
        localStorage.setItem("userId", loginData.user.id);
        localStorage.setItem("username", loginData.user.username);

        document.cookie = `authToken=${loginData.token}; path=/; max-age=${
          60 * 60 * 24 * 30
        }`;
        document.cookie = `userId=${loginData.user.id}; path=/; max-age=${
          60 * 60 * 24 * 30
        }`;

        console.log("✅ Auto-login successful!");
        console.log("Token saved:", localStorage.getItem("authToken"));
        console.log("User ID:", localStorage.getItem("userId"));

        // Redirect to event feed
        router.push("/events/event-feed");
      } else {
        // If auto-login fails, redirect to login page
        router.push("/login");
      }
    } catch (err) {
      console.error("Sign up error:", err);
      setError("An error occurred during sign up. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <motion.div
        ref={signRef}
        animate={show ? "visible" : "hidden"}
        variants={signVariant}
        className="flex-1 flex justify-center items-center h-screen text-blue-200"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
          className="p-8 rounded shadow-lg w-96"
        >
          <h2 className="text-5xl font-light mb-6 text-center">Sign Up</h2>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <label className="block mb-2">Username</label>
          <input
            type="text"
            placeholder="Choose a username"
            className="font-mono w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />

          <label className="block mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Your name"
            className="font-mono w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />

          <label className="block mb-2">Email Address</label>
          <input
            type="email"
            placeholder="Email"
            className="font-mono w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          <label className="block mb-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="font-mono w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => handlePassword("password", e.target.value)}
            disabled={isLoading}
          />

          <label className="block mb-2">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="font-mono w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => handlePassword("confirmPassword", e.target.value)}
            disabled={isLoading}
          />

          <div className="flex items-center mb-6">
            <input type="checkbox" id="terms" name="terms" className="mr-2" />
            <label htmlFor="terms" className="">
              I agree to the{" "}
              <span className="underline">terms and conditions</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="font-mono w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>

          <div className="text-center mt-4">
            <Link href="/login" className="hover:underline">
              Already have an account? Log in
            </Link>
          </div>
        </form>
      </motion.div>

      <div className="w-px bg-blue-200 h-100 flex"></div>

      <div className="flex-1 flex flex-col text-blue-200 ml-40 gap-5">
        <motion.h1
          ref={headerRef}
          animate={show ? "visible" : "hidden"}
          variants={headerVariant}
          className="text-6xl font-bold"
        >
          Join Our Campus
        </motion.h1>
        <motion.p
          ref={textRef}
          animate={show ? "visible" : "hidden"}
          variants={textVariant}
          custom={1}
          className="w-xl mt-3"
        >
          Create your account to access all campus events, workshops, and social
          gatherings. Stay updated and never miss out on exciting opportunities
          to connect with your peers. Sign up now and be part of our vibrant
          community!
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
    </div>
  );
}
export default SignUp;
