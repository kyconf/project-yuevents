"use client";

import { useRef } from "react";
import Header from "@/app/components/Header";
import Hero_Section from "@/app/components/Hero_Section";
import About from "@/app/components/About";
import Feature from "@/app/components/Feature";
import Footer from "@/app/components/Footer";
import Links from "@/app/components/Links";
import "swiper/css";
import "swiper/css/navigation"; 
import "@/app/globals.css";


export default function Home() {
  // create refs for section
  const aboutRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);

  // func scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ 
      behavior: 'smooth',
      
    });
  };

  return (
    <>
      <Header />
      <Hero_Section 
        onExploreNowClick={() => scrollToSection(featureRef)}
        onAboutUsClick={() => scrollToSection(aboutRef)}
      />
      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={featureRef}>
        <Feature />
      </div>
      <Links/>
      <Footer />
    </>
  );
}