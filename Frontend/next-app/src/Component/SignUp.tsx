"use client"

import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import {useRef} from "react"
import {motion} from "framer-motion";
import {useState, useEffect} from "react";

function SignUp(){
 const [show, setShow] = useState(false);
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [error, setError] = useState("");


  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 150); // delay 0.1s
    return () => clearTimeout(timer);
  }, []);


//in here we want to use the newest, updated state of password and confirmPassword
function handlePassword(field: "password" | "confirmPassword", value: string) {
  //create 2 variable that save the current state
  let newPassword = password;
  let newConfirm = confirmPassword;
  
  //save the newest state into that 2 variables, right after anychanges thanks to onChange
  if (field === "password") newPassword = value;
  if (field === "confirmPassword") newConfirm = value;
  
  //save it back to useState variable for future use
  setPassword(newPassword);
  setConfirmPassword(newConfirm);
  
  //compare
  if (newPassword && newConfirm && newPassword !== newConfirm) {
    setError("Passwords unmatch");
  } else {
    setError("");
  }
  
  };

 const headerVariant = {
  hidden: {opacity: 0, x: -100},
  visible:{
    opacity: 1,
    x: 0,
    transition: {duration: 1, ease: "easeOut"} 
  }
 };


 const textVariant = {
  hidden: {opacity: 0, y: 50},
  visible: (i=1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" }
  })
 };


 const signVariant = {
  hidden: {opacity: 0, x: 100},
  visible:{
    opacity: 1,
    x: 0,
    transition: {duration: 1, ease: "easeOut"} 
  }
 };
 const headerRef = useRef<HTMLDivElement>(null);
 const textRef = useRef<HTMLDivElement>(null);
 const signRef = useRef<HTMLDivElement>(null);


const handleSignUp = async () => {
  if(error) return;
  if(!email || !name || !password){
    alert("Please enter all information!!!");
    return;
  }

   try {
    const res = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if(!res.ok) {
         
    } else{

    }

  } catch(err){
    console.error(err);

  }
}

   return(
    <div className="flex h-screen items-center justify-center ">
    
    <motion.div
   ref={signRef}
    animate={show ? "visible" : "hidden"}
    variants={signVariant} 
   className="flex-1 flex justify-center items-center h-screen  text-blue-200">
      <form  onSubmit={(e) => {
    e.preventDefault();
    handleSignUp();
  }}
      className="p-8 rounded shadow-lg w-96 ">
          <h2 className="text-5xl font-light mb-6 text-center ">Sign Up</h2>
          <label className="block mb-2 ">Full Name</label>
          <input
            type="text"
            placeholder="Your name"
            className="font-mono w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block mb-2 ">Email Address</label>
          <input
            type="email"
            placeholder="Email"
            className="font-mono w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block mb-2 ">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="font-mono w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => handlePassword( "password", e.target.value)}

          />

          <label className="block mb-2">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="font-mono w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => handlePassword("confirmPassword", e.target.value)}
          />
          {error && <p className="mb-4">{error}</p>}


          <div className="flex items-center mb-6">
            <input type="checkbox" id="terms" name="terms" className="mr-2" />
            <label htmlFor="terms" className="">
              I agree to the <span className="underline">terms and conditions</span>
            </label>
          </div>
          <button
            type="submit"
            className="font-mono w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition-colors duration-300 cursor-pointer"
          >
            Sign Up
          </button>
        </form>
    </motion.div>

    <div className="w-px bg-blue-200 h-100 flex "></div>


   <div className="flex-1 flex flex-col  text-blue-200 ml-40 gap-5">
       <motion.h1
       ref={headerRef}
       animate={show ? "visible" : "hidden"}
       variants={headerVariant} 
       className="text-6xl font-bold">Join Our Campus</motion.h1>
       <motion.p 
       ref={textRef}
       animate={show ? "visible" : "hidden"}
       variants={textVariant} 
       custom={1}
       className="w-xl mt-3">  Create your account to access all campus events, workshops, and social gatherings. 
          Stay updated and never miss out on exciting opportunities to connect with your peers. 
          Sign up now and be part of our vibrant community! </motion.p>
     <motion.div 
     ref={textRef}
       animate={show ? "visible" : "hidden"}
       variants={textVariant} 
       custom={3}
     className="flex text-2xl gap-10 mt-10 md:mt-5">
              <a href="#" className="hover:text-blue-400 transition"><FaFacebookF /></a>
              <a href="#" className="hover:text-blue-400 transition"><FaTwitter /></a>
              <a href="#" className="hover:text-blue-400 transition"><FaInstagram /></a>
            </motion.div>
   </div>

    </div>
);

}
export default SignUp