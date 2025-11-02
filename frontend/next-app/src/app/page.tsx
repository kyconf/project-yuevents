"use client";

import { useRef } from 'react';
import Header from "@/Component/Header";
import Hero_Section from "@/Component/Hero_Section";
import About from "@/Component/About";
import Feature from "@/Component/Feature";
import Footer from "@/Component/Footer";
import Links from '@/Component/Links';
import 'swiper/css';
import 'swiper/css/navigation'; 
import '@/app/globals.css'


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